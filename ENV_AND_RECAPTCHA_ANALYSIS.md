# Environment Variables & reCAPTCHA Analysis

## 1. Environment Variables (.env) List

### Currently Used Variables:

| Variable Name | Location | Value | Purpose |
|---|---|---|---|
| `VITE_CONTACT_API_URL` | `.env` | `/api/contact.php` | Contact form API endpoint URL |

**Files Using These Variables:**
- `src/components/ContactSection.tsx` - Line 32: `const API_URL = import.meta.env.VITE_CONTACT_API_URL || "/api/contact.php";`

---

## 2. reCAPTCHA Implementation Analysis

### ⚠️ **CRITICAL FINDING: reCAPTCHA is NOT Verified on the Backend**

### reCAPTCHA Setup:

#### Frontend (Client-Side):
✅ **Implemented**
- **Site Key:** `6LdpZq4sAAAAACc87ym0oRUjKpiJ5nIsi_LWPxTh`
- **Location:** `src/hooks/useRecaptcha.ts`
- **Type:** Google reCAPTCHA v3 (invisible)
- **Action:** `contact_form`

**Frontend Flow:**
1. Hook: `useRecaptcha.ts` loads reCAPTCHA script from Google
2. Component: `App.tsx` calls `loadRecaptcha()` on mount
3. Component: `ContactSection.tsx` executes reCAPTCHA on form submission
4. Token is sent to backend via `recaptcha_token` field

**Files Involved:**
- `src/hooks/useRecaptcha.ts` - Hook definition
- `src/App.tsx` - Global reCAPTCHA initialization
- `src/components/ContactSection.tsx` - Form submission with token

#### Backend (Server-Side):
❌ **NOT Implemented - SECURITY RISK**
- `api/contact.php` receives the `recaptcha_token` but **does NOT verify it**
- Backend has NO secret key for verification
- Backend does NOT validate the token against Google's servers
- No validation logic exists to check token authenticity

**What's Missing on Backend:**
```php
// NOT IMPLEMENTED:
// 1. reCAPTCHA Secret Key
// 2. Verification call to: https://www.google.com/recaptcha/api/siteverify
// 3. Score validation (reCAPTCHA v3 returns score 0.0 - 1.0)
// 4. Error handling for invalid/expired tokens
```

---

## 3. Security Assessment

### Current Status:
- ✅ Frontend validation: Working
- ❌ Backend verification: Missing (Security Gap)
- ⚠️ Risk Level: **HIGH**

### Vulnerabilities:
1. **Spoofed Tokens:** Anyone can send fake tokens - backend doesn't verify
2. **Bypass Possible:** Bot can simply send any token without actual reCAPTCHA challenge
3. **No Score Validation:** Even if v3 score is sent, backend ignores it

---

## 4. Required Fixes

### Add reCAPTCHA Backend Verification:

**Step 1:** Get reCAPTCHA Secret Key from Google Cloud Console
- Go to: https://www.google.com/recaptcha/admin
- Find your reCAPTCHA v3 project
- Copy the **Secret Key**

**Step 2:** Add to `.env`:
```env
VITE_CONTACT_API_URL=/api/contact.php
RECAPTCHA_SECRET_KEY=YOUR_SECRET_KEY_HERE
```

**Step 3:** Update `api/contact.php` to verify token:
```php
// After line 42 (after email validation), add:

// --- reCAPTCHA Verification ---
$recaptcha_token = isset($data['recaptcha_token']) ? $data['recaptcha_token'] : null;
$recaptcha_secret = getenv('RECAPTCHA_SECRET_KEY') ?: 'YOUR_SECRET_KEY';

if (!$recaptcha_token) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "reCAPTCHA token is missing."]);
    exit();
}

// Verify token with Google
$verify_url = "https://www.google.com/recaptcha/api/siteverify";
$verify_data = http_build_query([
    'secret' => $recaptcha_secret,
    'response' => $recaptcha_token
]);

$context = stream_context_create([
    'http' => [
        'method' => 'POST',
        'content' => $verify_data,
        'header' => "Content-Type: application/x-www-form-urlencoded\r\n"
    ]
]);

$response = file_get_contents($verify_url, false, $context);
$result = json_decode($response, true);

// v3 returns: success (bool), score (0.0-1.0), action, challenge_ts, hostname
if (!$result['success'] || $result['score'] < 0.5) {
    http_response_code(403);
    echo json_encode(["status" => "error", "message" => "reCAPTCHA verification failed."]);
    exit();
}
```

---

## 5. Current Implementation Summary

| Component | Status | Details |
|---|---|---|
| Frontend reCAPTCHA Load | ✅ Yes | `useRecaptcha.ts` hook |
| Frontend Token Generation | ✅ Yes | v3 invisible |
| Frontend Token Submission | ✅ Yes | Sent in contact form |
| Backend Token Reception | ✅ Yes | Received in `$data['recaptcha_token']` |
| Backend Token Verification | ❌ **No** | **CRITICAL MISSING** |
| Backend Secret Key | ❌ **No** | Not configured |

---

## 6. Action Items

1. **URGENT:** Add reCAPTCHA secret key verification to backend
2. Add `RECAPTCHA_SECRET_KEY` to `.env` file
3. Implement verification logic in `api/contact.php`
4. Test with invalid/expired tokens
5. Log reCAPTCHA verification results for debugging
6. Consider IP whitelisting as additional security layer

---

**Generated:** 2026-05-25
**Severity:** HIGH - Backend verification missing
