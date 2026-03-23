---
name: review
description: Review existing code to verify it follows CLAUDE.md rules and the architecture patterns defined for this project.
user-invocable: true
disable-model-invocation: false
---

# Code Review — Nehemiah

Review the existing codebase to verify all code follows the conventions, architecture, and rules defined in CLAUDE.md.

## How to Review

1. Read `CLAUDE.md` to load all project rules and conventions
2. Read `docs/frontend-development.md` to load all frontend-specific rules and conventions
3. Read through the current source files in `backend/src/` and `frontend/src/`
4. Do NOT use git operations (`git diff`, `git log`, `git status`, etc.) — review the code as it stands
5. For every file, check that it follows the patterns and rules from CLAUDE.md and the frontend guide
6. Report findings organized by severity

## What to Check

- Code follows the **architecture patterns** defined in CLAUDE.md (repository pattern, module structure, layering, state management, forms, components)
- Frontend code follows **all rules in `docs/frontend-development.md`**, including:
  - **Mobile-first design** — base styles for mobile, responsive prefixes layered up (`sm:`, `md:`, `lg:`, `xl:`)
  - **File size limit** — no file exceeds 1000 lines
  - **Component placement** — shadcn primitives in `ui/`, reusable components in `ui/<name>/` or `shared/`, feature-specific in `features/<name>/components/`; every `ui/` component has its own folder with barrel export
  - **Page structure** — `page.tsx` stays thin, renders a feature listing component; listing component handles `isLoading`/`isError`/`data` states; child components receive resolved data as props
  - **Optional chaining** — `?.` and `??` used for all nullable access
  - **Performance** — `memo`, `useCallback`, `useMemo` applied where beneficial (lists 20+ items, callbacks to memoized children, array transformations)
  - **Types in type files** — never inline, always in `types/` folders; `interface` for object shapes, `type` for unions
  - **Data fetching** — TanStack Query for all server state, Zustand for client state only, no server data in Zustand
  - **Forms** — Zod schema + react-hook-form + zodResolver + shadcn Form components
  - **Imports** — path aliases only (`@/`, `@shared/`), no relative `../../../`; `import type` for type-only imports
  - **Styling** — Tailwind utility classes only, no inline styles, no CSS modules
  - **Accessibility** — semantic HTML, keyboard-accessible interactive elements, `aria-label` on icon-only buttons
- Code follows the **code style** rules in CLAUDE.md
- Code follows the **security** practices in CLAUDE.md (DTO validation, no hardcoded secrets, etc.)
- No **DRY violations** — shared logic is extracted, no copy-paste across modules
- **Tests exist** where CLAUDE.md expects them and they mock the right layer
- Nothing in the **Common Pitfalls** section of CLAUDE.md is being violated

## Output Format

Organize findings by severity:

### 1. CRITICAL — Bugs, security issues, broken functionality
### 2. CLAUDE.md VIOLATIONS — Code that breaks rules defined in CLAUDE.md
### 3. ARCHITECTURE — Layering or pattern issues
### 4. DRY VIOLATIONS — Duplicate code that should be extracted
### 5. FRONTEND GUIDE VIOLATIONS — Code that breaks rules in `docs/frontend-development.md`
### 6. BEST PRACTICE — Quality improvements
### 7. MISSING TESTS — Gaps ranked by risk

For each finding include:
- **File**: path and line number
- **Issue**: what's wrong
- **Fix**: how to resolve it
