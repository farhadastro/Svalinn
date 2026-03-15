# 📚 KNOWLEDGE ITEM: Admin Panel Migration Context

**Date Created:** December 13, 2025  
**Status:** ACTIVE  
**Tags:** admin-panel, next.js, django, migration, type-safety  
**Related:** implementation_plan.md, BEST_PRACTICES_FOR_AGENTS.md

---

## PROBLEM STATEMENT

**Goal:** Migrate admin panel UI from separate Inkosei/admin repository into the main auth-dash monorepo.

**Current Situation:**
- ✅ Backend: Django models + ViewSets exist (ContentFlag, ModerationEscalation, AuditLog)
- ⚠️ Backend: ViewSets not exposed in urls.py (API routes missing)
- ❌ Frontend: No admin UI in Next.js app
- 📁 Separate: Complete admin UI exists in Inkosei/admin repo (React Router + TypeScript)

**Success Criteria:**
- Admin UI migrated to `/app/admin/` in monorepo
- Connected to backend APIs at `/api/v1/admin/*`
- Role-based access control (ADMIN/MODERATOR only)
- All pages functional: Dashboard, Moderation, Stories
- No breaking changes to existing codebase

---

## ARCHITECTURAL DECISIONS

### 1. Directory Structure (APPROVED ✅)
```
app/admin/
├── layout.tsx           # Shared admin layout with role check
├── page.tsx            # Dashboard (KPIs, activity feed)
├── moderation/
│   └── page.tsx        # Reports queue, resolve/dismiss
└── stories/
    └── page.tsx        # Story management, feature/hide
```

### 2. API Routes (NOT YET DONE ⚠️)
```
Backend → Django
GET    /api/v1/admin/flags/              → List content flags
POST   /api/v1/admin/flags/<id>/resolve/ → Resolve a flag
POST   /api/v1/admin/flags/<id>/dismiss/ → Dismiss a flag
GET    /api/v1/admin/users/              → List users
PATCH  /api/v1/admin/users/<id>/         → Update user role
GET    /api/v1/admin/audit-log/          → Audit log
```

### 3. Type Safety (CRITICAL)
Must create `types/admin.ts` BEFORE building frontend components.

### 4. Role Permissions (DECISION PENDING)
**Option B recommended:** Moderators limited to flag review only.

---

## REACT ROUTER → NEXT.JS MIGRATION PATTERNS

| Pattern | React Router | Next.js |
|---------|-------------|---------|
| Links | `<Link to="/path">` | `<Link href="/admin/path">` |
| Current route | `useLocation()` | `usePathname()` |
| Route params | `useParams()` | Props: `{ params: { id } }` |
| Query params | `useSearchParams()` | `useSearchParams()` |
| Protected routes | `<ProtectedRoute>` wrapper | Layout + middleware |

---

## KNOWN GOTCHAS

1. **useClient vs Server Components**: Use server components for data fetching, 'use client' only for interactive parts
2. **JWT Token**: Read from cookies in middleware/layout, not localStorage
3. **Real-Time Updates**: Use manual refresh button (v1), WebSocket can be added later
4. **Large Tables**: Always paginate, add database indexes

---

## DECISION LOG

- **2025-12-13**: Separate `/app/admin/` from `/app/dashboard/` ✅
- **2025-12-13**: Manual refresh only (v1), no WebSocket ✅
- **2025-12-13**: Role permissions - PENDING decision

---

## FOLLOW-UP QUESTIONS

1. **Role Permissions:** What should MODERATOR role access?
2. **Real-Time:** Need flag notifications? (v2 feature)
3. **Data Retention:** How long to keep resolved flags?

---

*Last Updated: December 13, 2025*
