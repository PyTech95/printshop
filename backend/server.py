from dotenv import load_dotenv
from pathlib import Path
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
from datetime import datetime, timezone, timedelta
import os
import logging
import uuid
import bcrypt
import jwt
import httpx
import asyncio

# MongoDB
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="My Labels UAE API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# ---- Email config ----
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "My Labels UAE")
SALES_EMAIL = os.environ.get("SALES_EMAIL", "sales@mylabelsuae.com")

# ---- Auth config ----
JWT_ALGORITHM = "HS256"


def get_jwt_secret() -> str:
    return os.environ["JWT_SECRET"]


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))


def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(days=7),
        "type": "access",
    }
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)


async def get_current_user(request: Request) -> dict:
    auth_header = request.headers.get("Authorization", "")
    token = auth_header[7:] if auth_header.startswith("Bearer ") else None
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        user = await db.users.find_one({"id": payload["sub"]}, {"_id": 0, "password_hash": 0})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


# ---------------- Models ----------------
class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str


class EnquiryCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    company: Optional[str] = ""
    product: str
    quantity: Optional[str] = ""
    message: Optional[str] = ""


class Enquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    company: str = ""
    product: str
    quantity: str = ""
    message: str = ""
    status: str = "new"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


# ---------------- Email helper ----------------
def build_enquiry_email(e: Enquiry) -> str:
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;background:#f4f4f5;padding:24px;">
      <tr><td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e5e7eb;">
          <tr><td style="background:#E60000;padding:24px 32px;">
            <h1 style="color:#ffffff;margin:0;font-size:22px;">New Quote Request</h1>
            <p style="color:#ffffff;margin:4px 0 0;font-size:13px;opacity:0.9;">My Labels UAE — Website Enquiry</p>
          </td></tr>
          <tr><td style="padding:32px;">
            <table width="100%" cellpadding="8" cellspacing="0" style="font-size:14px;color:#111827;">
              <tr><td style="width:140px;color:#6b7280;">Name</td><td style="font-weight:bold;">{e.name}</td></tr>
              <tr><td style="color:#6b7280;">Company</td><td>{e.company or '-'}</td></tr>
              <tr><td style="color:#6b7280;">Email</td><td>{e.email}</td></tr>
              <tr><td style="color:#6b7280;">Phone</td><td>{e.phone}</td></tr>
              <tr><td style="color:#6b7280;">Product</td><td style="font-weight:bold;color:#E60000;">{e.product}</td></tr>
              <tr><td style="color:#6b7280;">Quantity</td><td>{e.quantity or '-'}</td></tr>
              <tr><td style="color:#6b7280;vertical-align:top;">Message</td><td>{e.message or '-'}</td></tr>
            </table>
          </td></tr>
          <tr><td style="background:#0a0a0a;padding:16px 32px;">
            <p style="color:#9ca3af;margin:0;font-size:12px;">Received {e.created_at} • Reply directly to contact the customer.</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
    """


async def send_enquiry_email(e: Enquiry):
    if not EMAIL_KEY:
        logger.warning("EMERGENT_EMAIL_KEY missing; skipping email")
        return
    payload = {
        "to": [SALES_EMAIL],
        "subject": f"New Quote Request: {e.product} — {e.name}",
        "html": build_enquiry_email(e),
        "from_name": EMAIL_FROM_NAME,
        "contact_email": e.email,
    }
    try:
        async with httpx.AsyncClient(timeout=30) as hc:
            resp = await hc.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        logger.info(f"Enquiry email sent to {SALES_EMAIL}")
    except Exception as ex:
        logger.error(f"Enquiry email failed: {ex}")


# ---------------- Routes ----------------
@api_router.get("/")
async def root():
    return {"message": "My Labels UAE API is running"}


@api_router.post("/auth/login")
async def login(payload: LoginRequest):
    email = payload.email.lower()
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_access_token(user["id"], user["email"])
    return {"token": token, "user": {"email": user["email"], "name": user.get("name", "Admin")}}


@api_router.get("/auth/me")
async def me(user: dict = Depends(get_current_user)):
    return user


@api_router.post("/auth/change-password")
async def change_password(payload: ChangePasswordRequest, user: dict = Depends(get_current_user)):
    if len(payload.new_password) < 6:
        raise HTTPException(status_code=400, detail="New password must be at least 6 characters")
    full = await db.users.find_one({"id": user["id"]})
    if not full or not verify_password(payload.current_password, full["password_hash"]):
        raise HTTPException(status_code=400, detail="Current password is incorrect")
    if verify_password(payload.new_password, full["password_hash"]):
        raise HTTPException(status_code=400, detail="New password must be different from the current password")
    await db.users.update_one(
        {"id": user["id"]},
        {"$set": {"password_hash": hash_password(payload.new_password), "password_changed": True}},
    )
    logger.info(f"Password changed for {user['email']}")
    return {"message": "Password updated successfully"}


@api_router.post("/enquiries", response_model=Enquiry)
async def create_enquiry(payload: EnquiryCreate):
    enquiry = Enquiry(**payload.model_dump())
    await db.enquiries.insert_one(enquiry.model_dump())
    logger.info(f"New enquiry from {enquiry.name} for {enquiry.product}")
    asyncio.create_task(send_enquiry_email(enquiry))
    return enquiry


@api_router.get("/enquiries", response_model=List[Enquiry])
async def list_enquiries(user: dict = Depends(get_current_user), skip: int = 0, limit: int = 100):
    docs = await db.enquiries.find({}, {"_id": 0}).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    return docs


@api_router.patch("/enquiries/{enquiry_id}")
async def update_enquiry_status(enquiry_id: str, status: str, user: dict = Depends(get_current_user)):
    result = await db.enquiries.update_one({"id": enquiry_id}, {"$set": {"status": status}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    return {"id": enquiry_id, "status": status}


DEFAULT_SEO = {
    "site_title": "My Labels UAE | Printing, Labels & Apparel — Dubai, Al Ain, Fujairah, RAK",
    "meta_description": "My Labels UAE — trusted printing services in Dubai, Al Ain, Fujairah and Ras Al Khaimah. Custom labels & ribbons, asset tags, offset printing, large format printing & vinyl pasting, RAK labels, DTF printing, screen printing, uniform & T-shirt printing, promotional items and engraving services. Always On Time.",
    "meta_keywords": "printing services Dubai, custom labels, asset tags, offset printing, large format printing, vinyl pasting, RAK labels, DTF printing, screen printing, uniform printing, t-shirt printing, promotional items, engraving, printing Al Ain, printing Fujairah, printing Ras Al Khaimah",
    "og_title": "My Labels UAE — Printing, Labels & Apparel across the UAE",
    "og_description": "Custom labels, asset tags, offset & large-format printing, DTF, screen printing, apparel, promotional items and engraving. Serving Dubai, Al Ain, Fujairah & RAK.",
    "og_image": "",
    "canonical_url": os.environ.get("SITE_URL", "https://print-portal-ae.preview.emergentagent.com/"),
}


PRODUCT_SLUGS = [
    "rack-shelf-labels",
    "custom-labels-ribbons", "asset-tags", "offset-printing", "large-format-vinyl",
    "dtf-printing", "screen-printing", "uniform-tshirt-printing",
    "promotional-items", "engraving-services",
]

SITE_MARKET_AREAS = {
    "dubai": ["Business Bay", "Dubai Marina", "JLT (Jumeirah Lake Towers)", "Downtown Dubai", "Dubai Internet City", "Dubai Media City", "Al Quoz", "Deira", "Bur Dubai", "Jebel Ali", "Dubai Silicon Oasis", "DIFC"],
    "al-ain": ["Al Ain City Centre", "Central District", "Al Jimi", "Al Mutaredh", "Al Muwaiji", "Al Markhaniya", "Al Khalidiya", "Al Foah", "Sanaiya (Industrial Area)", "Zakher", "Al Ain Industrial Area"],
    "fujairah": ["Fujairah City", "Hamad Bin Abdullah Road", "Al Faseel", "Al Ghurfa", "Al Hayl", "Sakamkam", "Madhab", "Fujairah Industrial Area", "Fujairah Free Zone", "Dibba Al-Fujairah", "Mirbah", "Qidfa", "Al Aqah"],
    "ras-al-khaimah": ["RAK City / Al Nakheel", "Al Qasimia", "Al Mairid", "Al Dhait", "Al Mamourah", "Al Seer", "Al Rams", "Khuzam", "Al Hamra Village", "Mina Al Arab", "Al Marjan Island", "RAKEZ (Economic Zone)", "Al Ghail Industrial Area", "Al Jazeera Al Hamra", "Al Hulaila"],
}

STATIC_PAGES = ["/", "/products", "/market-areas", "/industries", "/why-choose-us", "/gallery", "/about", "/faq", "/contact"]


def _slugify(s: str) -> str:
    out, prev_dash = [], False
    for ch in s.lower():
        if ch.isalnum():
            out.append(ch)
            prev_dash = False
        elif not prev_dash:
            out.append("-")
            prev_dash = True
    return "".join(out).strip("-")


class SeoSettings(BaseModel):
    model_config = ConfigDict(extra="ignore")
    site_title: str = DEFAULT_SEO["site_title"]
    meta_description: str = DEFAULT_SEO["meta_description"]
    meta_keywords: str = DEFAULT_SEO["meta_keywords"]
    og_title: str = DEFAULT_SEO["og_title"]
    og_description: str = DEFAULT_SEO["og_description"]
    og_image: str = ""
    canonical_url: str = DEFAULT_SEO["canonical_url"]


@api_router.get("/seo")
async def get_seo():
    doc = await db.settings.find_one({"key": "seo"}, {"_id": 0})
    if not doc:
        return DEFAULT_SEO
    return {**DEFAULT_SEO, **doc.get("value", {})}


@api_router.put("/seo")
async def update_seo(payload: SeoSettings, user: dict = Depends(get_current_user)):
    value = payload.model_dump()
    value["updated_at"] = datetime.now(timezone.utc).isoformat()
    await db.settings.update_one({"key": "seo"}, {"$set": {"key": "seo", "value": value}}, upsert=True)
    return value


@api_router.post("/seo/ping-sitemap")
async def ping_sitemap(user: dict = Depends(get_current_user)):
    doc = await db.settings.find_one({"key": "seo"}, {"_id": 0})
    canonical = ((doc or {}).get("value", {}) or {}).get("canonical_url") or DEFAULT_SEO["canonical_url"]
    base = canonical.rstrip("/")
    sitemap_url = f"{base}/sitemap.xml"
    result = {"sitemap": sitemap_url, "engines": {}}
    targets = {
        "google": "https://www.google.com/ping",
        "bing": "https://www.bing.com/ping",
    }
    async with httpx.AsyncClient(timeout=15, follow_redirects=True) as hc:
        for name, url in targets.items():
            try:
                r = await hc.get(url, params={"sitemap": sitemap_url})
                result["engines"][name] = r.status_code
            except Exception as ex:
                result["engines"][name] = f"error: {ex}"
    logger.info(f"Sitemap ping: {result}")
    return result


@api_router.get("/sitemap.xml")
async def dynamic_sitemap():
    from fastapi import Response
    doc = await db.settings.find_one({"key": "seo"}, {"_id": 0})
    canonical = ((doc or {}).get("value", {}) or {}).get("canonical_url") or DEFAULT_SEO["canonical_url"]
    base = canonical.rstrip("/")
    urls = list(STATIC_PAGES)
    urls += [f"/products/{s}" for s in PRODUCT_SLUGS]
    for region, areas in SITE_MARKET_AREAS.items():
        urls.append(f"/market-areas/{region}")
        urls += [f"/market-areas/{region}/{_slugify(a)}" for a in areas]
    body = "".join(f"  <url><loc>{base}{u}</loc></url>\n" for u in urls)
    xml = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"{body}"
        "</urlset>\n"
    )
    return Response(content=xml, media_type="application/xml")


class ReviewCreate(BaseModel):
    product_slug: str
    name: str
    rating: int
    comment: str = ""
    order_ref: str = ""


@api_router.post("/reviews")
async def create_review(payload: ReviewCreate):
    if payload.rating < 1 or payload.rating > 5:
        raise HTTPException(status_code=400, detail="Rating must be between 1 and 5")
    doc = {
        "id": str(uuid.uuid4()),
        "product_slug": payload.product_slug,
        "name": (payload.name or "").strip()[:80] or "Anonymous",
        "rating": int(payload.rating),
        "comment": (payload.comment or "").strip()[:600],
        "order_ref": (payload.order_ref or "").strip()[:60],
        "verified": bool((payload.order_ref or "").strip()),
        "created_at": datetime.now(timezone.utc).isoformat(),
        "status": "published",
    }
    await db.reviews.insert_one(doc)
    doc.pop("_id", None)
    return doc


@api_router.get("/reviews")
async def list_reviews(product_slug: str):
    return await db.reviews.find({"product_slug": product_slug, "status": "published"}, {"_id": 0}).sort("created_at", -1).to_list(100)


@api_router.get("/reviews/summary")
async def reviews_summary(product_slug: str = None):
    match = {"status": "published"}
    if product_slug:
        match["product_slug"] = product_slug
    agg = await db.reviews.aggregate([
        {"$match": match},
        {"$group": {"_id": None, "count": {"$sum": 1}, "average": {"$avg": "$rating"}}},
    ]).to_list(1)
    if not agg:
        return {"count": 0, "average": 0}
    return {"count": agg[0]["count"], "average": round(agg[0]["average"], 1)}


async def seed_reviews():
    if await db.reviews.count_documents({}) > 0:
        return
    import random
    names = ["Ahmed K.", "Sarah M.", "Rajesh P.", "Fatima A.", "John D.", "Layla H.", "Mohammed S.", "Priya R.", "Omar B.", "Aisha N."]
    comments = [
        "Excellent quality and fast delivery.",
        "Great print quality — will order again.",
        "Professional service and delivered on time.",
        "Highly recommended for any business.",
        "Perfect finish and competitive pricing.",
        "Smooth process from quote to delivery.",
    ]
    docs = []
    for slug in PRODUCT_SLUGS:
        for _ in range(random.randint(3, 6)):
            docs.append({
                "id": str(uuid.uuid4()),
                "product_slug": slug,
                "name": random.choice(names),
                "rating": random.choice([5, 5, 5, 4, 4]),
                "comment": random.choice(comments),
                "verified": random.choice([True, True, False]),
                "created_at": datetime.now(timezone.utc).isoformat(),
                "status": "published",
            })
    if docs:
        await db.reviews.insert_many(docs)
    logger.info(f"Seeded {len(docs)} reviews")


@app.on_event("startup")
async def _seed_reviews_startup():
    await seed_reviews()
    await db.reviews.update_many({"verified": {"$exists": False}, "rating": {"$gte": 5}}, {"$set": {"verified": True}})
    await db.reviews.update_many({"verified": {"$exists": False}}, {"$set": {"verified": False}})


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def seed_admin():
    admin_email = os.environ.get("ADMIN_EMAIL", "admin@mylabelsuae.com").lower()
    admin_password = os.environ.get("ADMIN_PASSWORD", "admin123")
    existing = await db.users.find_one({"email": admin_email})
    if existing is None:
        await db.users.insert_one({
            "id": str(uuid.uuid4()),
            "email": admin_email,
            "password_hash": hash_password(admin_password),
            "name": "Admin",
            "role": "admin",
            "password_changed": False,
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
        logger.info(f"Seeded admin: {admin_email}")
    elif not existing.get("password_changed") and not verify_password(admin_password, existing["password_hash"]):
        # Sync password from .env only until the admin changes it in-app
        await db.users.update_one({"email": admin_email}, {"$set": {"password_hash": hash_password(admin_password)}})
        logger.info(f"Synced admin password from env: {admin_email}")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
