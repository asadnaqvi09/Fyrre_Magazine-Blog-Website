# Fyrre Magazine — Project Analysis

> A full-stack editorial blogging platform built with **Express.js + MongoDB** (backend) and **Next.js 16 + Redux Toolkit** (frontend).

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Pros](#-pros)
3. [Cons](#-cons)
4. [Missing Elements & Gaps](#-missing-elements--gaps)
5. [Frontend ↔ Backend Inconsistencies](#-frontend--backend-inconsistencies)
6. [Bug Report](#-bug-report)
7. [Recommendations](#-recommendations)

---

## Project Overview

| Component | Stack                                      | Port | Status                           |
| --------- | ------------------------------------------ | ---- | -------------------------------- |
| Backend   | Express 5 + Mongoose 9 + MongoDB           | 4000 | Functional                       |
| Frontend  | Next.js 16 + Redux Toolkit + TailwindCSS 4 | 3000 | Partially functional (mock data) |

**User Roles:** Reader → Author → Admin

**Core Features:** User registration/auth, blog publishing, admin moderation, analytics tracking, email notifications, automated rejected blog cleanup.

---

## ✅ Pros

### Backend Architecture

- **Clean layered architecture** — Routes → Controllers → Services → Models separation is well-structured and maintainable
- **Security-first approach** — Helmet, XSS protection, MongoDB sanitization, rate limiting (global, auth, blog, upload) all implemented
- **JWT dual-token strategy** — Access + Refresh tokens with database-backed refresh token revocation
- **Email verification flow** — Complete registration → email verification → login pipeline
- **Cloudinary integration** — Image upload with automatic cleanup on failure (rollback cleanup in blog/user controllers)
- **Cron-based auto-cleanup** — Rejected blogs auto-deleted after 24 hours with email notification to author
- **Slug-based blog URLs** — SEO-friendly blog URLs using `slugify`
- **Blog moderation workflow** — Admin can approve/reject blogs with email notifications to authors
- **Consistent API response format** — Standardized `ApiResponse` and `ApiError` classes across all endpoints
- **Zod validation setup** — Validation schemas and middleware exist (though underutilized)

### Frontend Architecture

- **Redux Toolkit** — Modern state management with `createSlice` + `createAsyncThunk`
- **Repository pattern** — Clean data access abstraction with `authRepo`, `blogRepo`, `authorRepo`
- **Mock data toggle** — `USE_MOCK` flag enables offline frontend development
- **Axios with interceptor** — Auto-attaches auth tokens to all requests
- **Role-based route protection** — Dashboard layouts check auth state and role before rendering
- **Token refresh on mount** — Dashboard layouts auto-refresh expired tokens
- **Modern UI stack** — Next.js 16 + TailwindCSS 4 + Framer Motion + Recharts

---

## ❌ Cons

### Backend

- **No input validation on most routes** — Zod schemas and `validate` middleware exist but are NOT applied to any route. Only `auth.validations.js` exists and isn't used either
- **Blogs auto-publish** — `createBlogService` sets `blogStatus: "published"` directly, completely bypassing the admin approval workflow
- **No pagination** — All list endpoints (`getAllBlogs`, `fetchAllBlogs`, `fetchUsers`) return all records. This will not scale
- **No search/filter** — No text search, category filtering, or advanced query capabilities on blog listing
- **Dashboard endpoints are placeholders** — `/dashboard/admin` and `/dashboard/author` just return a welcome message string
- **`POST` for delete** — `DELETE /users/user/:userId` uses `POST` method instead of `DELETE`, violating REST conventions
- **No password reset** — Token model supports `reset-password` type but no password reset API exists
- **No `isActive` toggle** — Users have `isActive` field but no API to deactivate/reactivate
- **Sensitive data exposure** — `resendVerificationEmail` returns the verification link in the API response (should be email-only)
- **No error logging service** — Errors go to `console.log` only, no structured logging or monitoring

### Frontend

- **Only 21% API integration** — Out of 28 backend endpoints, only 6 auth endpoints are called. Everything else uses mock data
- **`USE_MOCK = true` hardcoded** — Blog and author features have zero real backend integration
- **No admin dashboard functionality** — Admin pages exist in the UI but have no API calls to manage users, blogs, or categories
- **No author dashboard functionality** — Author dashboard is literally a placeholder text string
- **Auth tokens in localStorage** — Vulnerable to XSS attacks; httpOnly cookies would be more secure
- **Logout removes localStorage before reading it** — `logoutUser()` calls `localStorage.removeItem("auth")` first, then tries to read `localStorage.getItem("auth")` for the refresh token (bug — will always read empty)

---

## 🔍 Missing Elements & Gaps

### Backend APIs That Exist But Frontend Never Calls

| API                            | Purpose                  | Impact                                  |
| ------------------------------ | ------------------------ | --------------------------------------- |
| `GET /auth/profile`            | Get current user profile | Profile page can't load real data       |
| `GET /users/`                  | List all users           | Admin can't manage users                |
| `POST /users/user/:userId`     | Delete user              | Admin can't delete users                |
| `PATCH /users/promote/:userId` | Promote to Author        | Admin can't promote users               |
| `PATCH /users/revoke/:userId`  | Revoke Author role       | Admin can't revoke authors              |
| `PATCH /users/author/me`       | Update author profile    | Authors can't update their profile      |
| `POST /blogs/createBlog`       | Create blog              | Authors can't create blogs              |
| `PUT /blogs/:blogId`           | Update blog              | Authors can't edit blogs                |
| `DELETE /blogs/:blogId`        | Delete blog              | Authors can't delete blogs              |
| `GET /blogs/my-blogs`          | Author's own blogs       | Authors can't see their blog list       |
| All Admin APIs                 | Blog moderation          | Admin moderation panel non-functional   |
| All Analytics APIs             | View tracking & stats    | No analytics data captured or displayed |
| All Dashboard APIs             | Dashboard home data      | Dashboard shows no real data            |

### Backend Routes That Exist But Are NOT Mounted

| Route File           | Supposed Path        | APIs                     | Status               |
| -------------------- | -------------------- | ------------------------ | -------------------- |
| `category.routes.js` | `/api/v1/categories` | GET, POST, PATCH, DELETE | ❌ Not in `index.js` |
| `tag.routes.js`      | `/api/v1/tags`       | GET, POST, PATCH, DELETE | ❌ Not in `index.js` |
| `setting.route.js`   | `/api/v1/settings`   | GET, PUT                 | ❌ Not in `index.js` |

### Models That Exist But Have No API

| Model               | Purpose             | Status                                    |
| ------------------- | ------------------- | ----------------------------------------- |
| `like.model.js`     | Blog likes tracking | ❌ No routes, controllers, or services    |
| `settings.model.js` | Site settings       | ⚠️ Service exists but route not mounted   |
| `category.model.js` | Blog categories     | ⚠️ Full CRUD exists but route not mounted |
| `tags.model.js`     | Blog tags           | ⚠️ Full CRUD exists but route not mounted |

### Frontend Pages That Have No Backend API

| Page                  | Expected API                            | Current State                         |
| --------------------- | --------------------------------------- | ------------------------------------- |
| Admin Blog Management | `GET/PUT /admin/blogs/...`              | Static UI, no API calls               |
| Admin User Management | `GET/PATCH/DELETE /users/...`           | Static UI, no API calls               |
| Admin Categories      | `GET/POST/PATCH/DELETE /categories/...` | Static UI + backend route not mounted |
| Admin Analytics       | `GET /analytics/admin`                  | Static UI, no API calls               |
| Admin Settings        | `GET/PUT /settings/...`                 | Static UI + backend route not mounted |
| Author Blog Editor    | `POST/PUT /blogs/...`                   | Static UI, no API calls               |
| Author Analytics      | `GET /analytics/author`                 | Static UI, no API calls               |
| Author Settings       | `PATCH /users/author/me`                | Static UI, no API calls               |

---

## ⚡ Frontend ↔ Backend Inconsistencies

### 1. Port Mismatch

|                        | Port   | Config Location                                  |
| ---------------------- | ------ | ------------------------------------------------ |
| Backend server         | `4000` | `magazine-backend/.env` or `PORT` default        |
| Frontend Axios baseURL | `5000` | `src/lib/api/axios.js`                           |
| Backend CORS origin    | `3000` | `magazine-backend/.env` or `CORS_ORIGIN` default |

> **Fix:** Change Axios `baseURL` from `http://localhost:5000/api/v1` to `http://localhost:4000/api/v1`

### 2. URL Pattern Mismatch

|                  | Backend                                | Frontend (non-mock)                                        |
| ---------------- | -------------------------------------- | ---------------------------------------------------------- |
| Get all blogs    | `GET /api/v1/blogs/`                   | `fetch("/api/blogs")` — missing `/v1` prefix, relative URL |
| Get blog by slug | `GET /api/v1/blogs/:slug`              | `fetch("/api/blogs/:slug")` — missing `/v1`, relative URL  |
| Get all authors  | `GET /api/v1/users/author/:id` (by ID) | `fetch("/api/authors")` — wrong endpoint entirely          |
| Get author       | `GET /api/v1/users/author/:authorId`   | `fetch("/api/authors/:username")` — by username vs by ID   |

### 3. Author Lookup Paradigm Mismatch

- **Backend:** Looks up authors by MongoDB ObjectId (`/users/author/:authorId`)
- **Frontend:** Looks up authors by username (`/authors/:username`)
- **Impact:** Even when `USE_MOCK` is set to `false`, author profiles will never load from the backend

### 4. Auth Middleware Inconsistency

The `protectedRoute` middleware is used **two different ways** across routes:

- **As a function call** with roles: `protectedRoute(["Admin"])` — in `dashboard.routes.js`, `blog.routes.js`, `setting.route.js`
- **As a reference** (no roles): `protectedRoute` — in `auth.routes.js`, `user.routes.js`

When used as a reference without calling `()`, it actually works because it returns a middleware function, but `roles` will be `[]` (empty), allowing any authenticated user through.

### 5. `SendEmail` Call Signature Inconsistency

- **Most places:** `SendEmail({ to, subject, html })` — object parameter
- **`user.services.js`:** `SendEmail(email, subject, html)` — positional parameters
- **Impact:** Promote/revoke author email notifications will silently fail

---

## 🐛 Bug Report

| #   | Severity    | Location                        | Bug                                                                                                        | Impact                                                       |
| --- | ----------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| 1   | 🔴 Critical | `authorAnalytics.services.js:5` | Queries `{ author: authorId }` but Blog model field is `blogAuthor`                                        | Author analytics always returns 0 views                      |
| 2   | 🔴 Critical | `authRepo.js:16-28`             | `logoutUser()` removes localStorage before reading it                                                      | Logout never sends refresh token to backend for invalidation |
| 3   | 🟡 Medium   | `analytics.model.js:36,44`      | Partial filter uses `"USER"` / `"GUEST"` (uppercase) but enum values are `"User"` / `"Guest"` (title case) | Unique index won't enforce uniqueness properly               |
| 4   | 🟡 Medium   | `axios.js:4`                    | `baseURL: 'http://localhost:5000/api/v1'`                                                                  | Frontend auth calls go to wrong port                         |
| 5   | 🟡 Medium   | `user.services.js:32,48`        | `SendEmail(email, subject, html)` uses wrong call signature                                                | Author promotion/revoke emails fail silently                 |
| 6   | 🟢 Low      | `blog.routes.js:17`             | `GET /my-blogs` route is defined AFTER `router.get("/:slug")`                                              | `/my-blogs` will be caught by `/:slug` as `slug="my-blogs"`  |
| 7   | 🟢 Low      | `validate.middleware.js:1`      | `import ApiError from "../utilis/ApiError"` — missing `.js` extension                                      | Will fail in ES module mode                                  |
| 8   | 🟢 Low      | `setting.controller.js:9`       | `getSettings` calls `createSettingService` (creates if not exists) — side effect on GET                    | Violates REST semantics                                      |

---

## 📋 Recommendations

### Immediate Fixes (Critical)

1. **Fix `authorAnalytics.services.js`** — Change `{ author: authorId }` to `{ blogAuthor: authorId }`
2. **Fix `logoutUser()` in authRepo** — Read localStorage before removing it
3. **Fix Axios baseURL** — Change port from `5000` to `4000`
4. **Fix analytics model indexes** — Change `"USER"`/`"GUEST"` to `"User"`/`"Guest"` in partial filter expressions
5. **Fix `SendEmail` call signature** — Change positional args to object format in `user.services.js`
6. **Fix route ordering** — Move `GET /my-blogs` before `GET /:slug` in `blog.routes.js`

### Short-term (Integration)

1. **Mount missing routes** — Register category, tag, and settings routes in `index.js`
2. **Set `USE_MOCK = false`** and wire `blogRepo`/`authorRepo` to real backend APIs via Axios
3. **Implement admin dashboard API integration** — Connect UI components to admin/user backend endpoints
4. **Implement author dashboard** — Wire blog CRUD, analytics, profile update to backend

### Medium-term (Features)

1. **Add pagination** to all list endpoints (blogs, users, categories, tags)
2. **Add blog search and filtering** by category, tag, author, keyword
3. **Implement Like API** — Like model exists but has no routes/services
4. **Implement Password Reset** — Token model already supports `reset-password` type
5. **Change blog creation to `pending` status** — Enforce admin approval before publishing
6. **Add input validation** — Apply Zod validation middleware to all routes
7. **Move tokens to httpOnly cookies** — More secure than localStorage

### Long-term (Production Readiness)

1. **Add structured logging** (Winston/Pino) for production error tracking
2. **Add automated tests** — No test suite exists
3. **Add API versioning documentation** — `/api/v1` is used but no migration strategy exists
4. **Add CI/CD pipeline** for automated builds and deployments
5. **Add Swagger/OpenAPI documentation** for automatic interactive API docs
6. **Implement caching layer** (Redis) for frequently accessed data
7. **Add image optimization pipeline** for uploaded images

### Dummy Login

For Admin:
{
userName: AdminAsad,
email: ragesr56@gmail.com,
password: admin12345,
confirmPassword: admin12345
}
For User1:
{
userName: TestUser,
email: nasad8569@gmail.com,
password: test12345,
confirmPassword: test12345  
}
For User2:
{
userName: TestUser2,
email: azadari87@gmail.com,
password: tester12345,
confirmPassword: tester12345  
}
