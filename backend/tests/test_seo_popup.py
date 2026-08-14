"""Backend tests for per-page SEO and popup endpoints (My Labels UAE)."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://print-shop-test.preview.emergentagent.com").rstrip("/")
ADMIN_EMAIL = "admin@mylabelsuae.com"
ADMIN_PASSWORD = "mylabels@1425"

EXPECTED_PATHS = {"/", "/products", "/industries", "/why-choose-us", "/gallery", "/about", "/faq", "/contact", "/market-areas"}


@pytest.fixture(scope="session")
def token():
    r = requests.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}, timeout=15)
    assert r.status_code == 200, r.text
    return r.json().get("access_token") or r.json().get("token")


@pytest.fixture()
def auth_headers(token):
    return {"Authorization": f"Bearer {token}"}


# ---- Per-page SEO ----
class TestPageSeo:
    def test_get_pages(self):
        r = requests.get(f"{BASE_URL}/api/seo/pages", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert "pages" in data and "meta" in data
        paths = {m["path"] for m in data["meta"]}
        assert paths == EXPECTED_PATHS, f"Unexpected paths: {paths}"
        # each path has default entry
        for p in EXPECTED_PATHS:
            assert p in data["pages"], f"missing default for {p}"
            assert data["pages"][p].get("site_title"), f"missing title for {p}"

    def test_put_pages_unauthorized(self):
        r = requests.put(f"{BASE_URL}/api/seo/pages", json={"pages": {}}, timeout=15)
        assert r.status_code in (401, 403)

    def test_put_pages_persist_and_restore(self, auth_headers):
        # get current
        cur = requests.get(f"{BASE_URL}/api/seo/pages", timeout=15).json()["pages"]
        original_about = dict(cur.get("/about", {}))
        # update About title
        cur["/about"] = {**original_about, "site_title": "TEST_About Title"}
        r = requests.put(f"{BASE_URL}/api/seo/pages", json={"pages": cur}, headers=auth_headers, timeout=15)
        assert r.status_code == 200, r.text
        # verify
        got = requests.get(f"{BASE_URL}/api/seo/pages", timeout=15).json()["pages"]
        assert got["/about"]["site_title"] == "TEST_About Title"
        # restore
        cur["/about"] = original_about
        r = requests.put(f"{BASE_URL}/api/seo/pages", json={"pages": cur}, headers=auth_headers, timeout=15)
        assert r.status_code == 200
        got = requests.get(f"{BASE_URL}/api/seo/pages", timeout=15).json()["pages"]
        assert got["/about"]["site_title"] == original_about["site_title"]


# ---- Popup ----
class TestPopup:
    def test_get_popup(self):
        r = requests.get(f"{BASE_URL}/api/popup", timeout=15)
        assert r.status_code == 200
        d = r.json()
        for k in ["enabled", "delay_seconds", "headline", "headline_ar", "subtext", "button_label"]:
            assert k in d

    def test_put_popup_unauthorized(self):
        r = requests.put(f"{BASE_URL}/api/popup", json={"enabled": True}, timeout=15)
        assert r.status_code in (401, 403)

    def test_put_popup_persist_and_restore(self, auth_headers):
        original = requests.get(f"{BASE_URL}/api/popup", timeout=15).json()
        payload = {**{k: original[k] for k in original if k != "updated_at"}, "delay_seconds": 2}
        r = requests.put(f"{BASE_URL}/api/popup", json=payload, headers=auth_headers, timeout=15)
        assert r.status_code == 200, r.text
        assert r.json()["delay_seconds"] == 2
        # restore
        payload["delay_seconds"] = 15
        r = requests.put(f"{BASE_URL}/api/popup", json=payload, headers=auth_headers, timeout=15)
        assert r.status_code == 200
        assert r.json()["delay_seconds"] == 15


# ---- Enquiries create (public) ----
class TestEnquiries:
    def test_create_popup_enquiry(self, auth_headers):
        payload = {
            "name": "TEST_PopupLead",
            "email": "test_popup@example.com",
            "phone": "+971500000000",
            "product": "Website Popup Enquiry",
            "message": "backend pytest lead",
        }
        r = requests.post(f"{BASE_URL}/api/enquiries", json=payload, timeout=15)
        assert r.status_code in (200, 201), r.text
        # verify in admin listing
        r2 = requests.get(f"{BASE_URL}/api/enquiries", headers=auth_headers, timeout=15)
        assert r2.status_code == 200
        items = r2.json() if isinstance(r2.json(), list) else r2.json().get("enquiries") or r2.json().get("items") or []
        assert any(e.get("name") == "TEST_PopupLead" and e.get("product") == "Website Popup Enquiry" for e in items)
