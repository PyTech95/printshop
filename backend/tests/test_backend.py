"""Backend tests for My Labels UAE API (enquiries + auth)."""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL") or open("/app/frontend/.env").read().split("REACT_APP_BACKEND_URL=")[1].split("\n")[0].strip()
BASE_URL = BASE_URL.rstrip("/")
API = f"{BASE_URL}/api"

ADMIN_EMAIL = "admin@mylabelsuae.com"
ADMIN_PASSWORD = "admin123"


@pytest.fixture(scope="session")
def admin_token():
    r = requests.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}, timeout=30)
    assert r.status_code == 200, f"login failed: {r.status_code} {r.text}"
    data = r.json()
    assert "token" in data and isinstance(data["token"], str) and data["token"]
    assert data["user"]["email"] == ADMIN_EMAIL
    return data["token"]


# --- Root ---
def test_root():
    r = requests.get(f"{API}/", timeout=30)
    assert r.status_code == 200
    assert "running" in r.json().get("message", "").lower()


# --- Auth ---
def test_login_success(admin_token):
    assert admin_token


def test_login_invalid():
    r = requests.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": "wrong"}, timeout=30)
    assert r.status_code == 401


def test_me_requires_auth():
    r = requests.get(f"{API}/auth/me", timeout=30)
    assert r.status_code == 401


def test_me_with_token(admin_token):
    r = requests.get(f"{API}/auth/me", headers={"Authorization": f"Bearer {admin_token}"}, timeout=30)
    assert r.status_code == 200
    assert r.json()["email"] == ADMIN_EMAIL


# --- Enquiries ---
def test_create_enquiry_public():
    unique = f"TEST_{uuid.uuid4().hex[:8]}"
    payload = {
        "name": unique,
        "email": f"{unique}@example.com",
        "phone": "+971500000000",
        "company": "TestCo",
        "product": "Barcode Labels",
        "quantity": "1000",
        "message": "please quote",
    }
    r = requests.post(f"{API}/enquiries", json=payload, timeout=30)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["id"] and data["status"] == "new"
    assert data["name"] == unique
    assert data["product"] == "Barcode Labels"
    pytest.enquiry_id = data["id"]
    pytest.enquiry_name = unique


def test_list_enquiries_requires_auth():
    r = requests.get(f"{API}/enquiries", timeout=30)
    assert r.status_code == 401


def test_list_enquiries_with_token(admin_token):
    r = requests.get(f"{API}/enquiries", headers={"Authorization": f"Bearer {admin_token}"}, timeout=30)
    assert r.status_code == 200
    items = r.json()
    assert isinstance(items, list)
    ids = [i["id"] for i in items]
    assert getattr(pytest, "enquiry_id", None) in ids


def test_patch_enquiry_status(admin_token):
    eid = getattr(pytest, "enquiry_id", None)
    assert eid
    r = requests.patch(
        f"{API}/enquiries/{eid}?status=contacted",
        headers={"Authorization": f"Bearer {admin_token}"},
        timeout=30,
    )
    assert r.status_code == 200
    assert r.json()["status"] == "contacted"



# --- SEO settings ---
SEO_KEYS = {"site_title", "meta_description", "meta_keywords", "og_title", "og_description", "og_image", "canonical_url"}


def test_get_seo_public():
    r = requests.get(f"{API}/seo", timeout=30)
    assert r.status_code == 200
    data = r.json()
    assert SEO_KEYS.issubset(set(data.keys())), f"missing keys: {SEO_KEYS - set(data.keys())}"
    assert isinstance(data["site_title"], str) and data["site_title"]
    pytest.original_seo = {k: data[k] for k in SEO_KEYS}


def test_put_seo_requires_auth():
    r = requests.put(f"{API}/seo", json=pytest.original_seo, timeout=30)
    assert r.status_code == 401


def test_put_seo_with_token_updates_and_persists(admin_token):
    original = pytest.original_seo
    modified = {**original, "site_title": original["site_title"] + " [TEST]"}
    headers = {"Authorization": f"Bearer {admin_token}"}
    try:
        r = requests.put(f"{API}/seo", json=modified, headers=headers, timeout=30)
        assert r.status_code == 200, r.text
        saved = r.json()
        assert saved["site_title"] == modified["site_title"]
        # persistence via GET
        g = requests.get(f"{API}/seo", timeout=30)
        assert g.status_code == 200
        assert g.json()["site_title"] == modified["site_title"]
    finally:
        # Restore original values (critical per instructions)
        rr = requests.put(f"{API}/seo", json=original, headers=headers, timeout=30)
        assert rr.status_code == 200
        g2 = requests.get(f"{API}/seo", timeout=30)
        assert g2.json()["site_title"] == original["site_title"]


# --- Sitemap ---
def test_sitemap_xml():
    r = requests.get(f"{API}/sitemap.xml", timeout=30)
    assert r.status_code == 200
    assert "xml" in r.headers.get("content-type", "").lower()
    body = r.text
    assert "<urlset" in body and "<loc>" in body
    assert "/products/custom-labels-ribbons" in body
    assert "/products/rack-shelf-labels" in body
    assert "/market-areas/dubai" in body
    # Ensure removed product is gone
    assert "/products/rak-labels" not in body
    # Ensure all 10 remaining slugs are present
    for s in [
        "rack-shelf-labels", "custom-labels-ribbons", "asset-tags", "offset-printing",
        "large-format-vinyl", "dtf-printing", "screen-printing",
        "uniform-tshirt-printing", "promotional-items", "engraving-services",
    ]:
        assert f"/products/{s}" in body


# --- Reviews ---
def test_create_review_valid():
    r = requests.post(f"{API}/reviews", json={
        "product_slug": "custom-labels-ribbons",
        "name": "TEST_Reviewer",
        "rating": 5,
        "comment": "great",
    }, timeout=30)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["rating"] == 5
    assert data["product_slug"] == "custom-labels-ribbons"


def test_create_review_invalid_rating_zero():
    r = requests.post(f"{API}/reviews", json={
        "product_slug": "custom-labels-ribbons", "name": "x", "rating": 0,
    }, timeout=30)
    assert r.status_code == 400


def test_create_review_invalid_rating_six():
    r = requests.post(f"{API}/reviews", json={
        "product_slug": "custom-labels-ribbons", "name": "x", "rating": 6,
    }, timeout=30)
    assert r.status_code == 400


def test_list_reviews():
    r = requests.get(f"{API}/reviews", params={"product_slug": "custom-labels-ribbons"}, timeout=30)
    assert r.status_code == 200
    assert isinstance(r.json(), list)


def test_reviews_summary():
    r = requests.get(f"{API}/reviews/summary", params={"product_slug": "custom-labels-ribbons"}, timeout=30)
    assert r.status_code == 200
    data = r.json()
    assert "count" in data and "average" in data


# --- Enquiries pagination ---
def test_list_enquiries_pagination(admin_token):
    r = requests.get(f"{API}/enquiries", params={"skip": 0, "limit": 5},
                     headers={"Authorization": f"Bearer {admin_token}"}, timeout=30)
    assert r.status_code == 200
    assert isinstance(r.json(), list)
    assert len(r.json()) <= 5


# --- Favicon ---
def test_favicon_reachable():
    r = requests.get(f"{BASE_URL}/favicon.png", timeout=30)
    assert r.status_code == 200
    ctype = r.headers.get("content-type", "")
    assert "image" in ctype.lower(), f"unexpected content-type: {ctype}"
    assert len(r.content) > 100
