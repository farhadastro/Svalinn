# 📋 IMPLEMENTATION PLAN REVIEW: Admin Panel Migration

**Date:** December 13, 2025  
**Status:** ✅ APPROVED (with refinements)  
**Scope:** Migrate admin panel UI from Inkosei/admin → auth-dash monorepo  
**Effort:** ~2–3 weeks (3 phases)

---

## Summary

Plan approved with these key refinements:
1. Break into atomic tasks (1-2 per day)
2. Create types/admin.ts before Phase 2
3. Define role permissions (MODERATOR = flags only, ADMIN = full access)
4. Add API client setup (lib/api/admin.ts)
5. Handle errors & edge cases

## Refined Task Breakdown

### Phase 0: Preparation (1 day)
- 0.1: Document API response shapes
- 0.2: Define role permission matrix
- 0.3: Create types/admin.ts
- 0.4: Create knowledge item

### Phase 1: Backend API Exposure (2–3 days)
- 1.1: Create moderation/urls.py with router
- 1.2: Add admin routes to config/urls.py
- 1.3: Test endpoints with curl
- 1.4: Add unit tests

### Phase 2: Frontend Setup (5–7 days)
- 2.1: Install shadcn components
- 2.2: Create lib/api/admin.ts (API client)
- 2.3: Create app/admin/layout.tsx
- 2.4: Create app/admin/page.tsx (Dashboard)
- 2.5: Create app/admin/moderation/page.tsx
- 2.6: Create app/admin/stories/page.tsx
- 2.7: Handle errors + loading states

### Phase 3: Integration & Testing (3–5 days)
- 3.1: End-to-end testing
- 3.2: Performance testing
- 3.3: Cleanup + documentation

---

*Review completed: December 13, 2025*
