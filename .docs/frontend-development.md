# Frontend Development Guide

This document defines the rules, patterns, and conventions for building the Nehemiah frontend. **All frontend work MUST follow these instructions.**

---

## 1. File Size Limit

No single file may exceed **1000 lines of code**. If a file approaches this limit, split it into smaller, focused modules.

---

## 2. Mobile-First Design

All UI development follows a **mobile-first** approach:

- Write base styles for mobile viewports first
- Layer on tablet/desktop styles using Tailwind responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`)
- Test every page and component at mobile width (320px-375px) before expanding
- Use responsive Tailwind utilities, never hardcode pixel widths for layout

```tsx
// CORRECT: mobile-first
<div className="flex flex-col gap-4 md:flex-row md:gap-6 lg:gap-8">
  <aside className="w-full md:w-64 lg:w-72">...</aside>
  <main className="flex-1">...</main>
</div>

// WRONG: desktop-first, hiding on mobile
<div className="flex flex-row gap-8 max-md:flex-col max-md:gap-4">...</div>
```

---

## 3. Component Organization

### 3.1 Where Components Live

| Location | Purpose |
|---|---|
| `src/components/ui/` | shadcn/ui primitives. Do NOT modify these directly. |
| `src/components/ui/<name>/` | Custom reusable UI components (e.g., `src/components/ui/button/`, `src/components/ui/data-table/`). Each gets its own folder. |
| `src/components/layout/` | App shell: Navbar, Sidebar, Footer |
| `src/components/shared/` | Reusable non-shadcn components used across multiple features |
| `src/features/<name>/components/` | Components specific to a single feature |

### 3.2 Component Placement Decision

Before creating a new component:

1. **Check `src/components/ui/`** — does a shadcn/ui primitive already cover this?
2. **Is it reusable across 2+ features?** — put it in `src/components/ui/<name>/` (with its own folder) or `src/components/shared/`
3. **Is it specific to one feature?** — put it in `src/features/<name>/components/`
4. **Never** duplicate a component that already exists in `ui/` or `shared/`

### 3.3 Every UI Component Gets a Folder

**All** components in `src/components/ui/` must live in their own folder — no flat files. This applies to both shadcn primitives and custom components. Each folder contains the component file(s) and an `index.ts` barrel export.

```
src/components/ui/
├── button/
│   ├── button.tsx
│   └── index.ts
├── input/
│   ├── input.tsx
│   └── index.ts
├── data-table/
│   ├── data-table.tsx
│   ├── data-table-header.tsx
│   ├── data-table-pagination.tsx
│   └── index.ts
├── stat-card/
│   ├── stat-card.tsx
│   └── index.ts
└── ...
```

Import via the folder path:
```tsx
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
```

---

## 4. Feature Module Structure

Every feature lives in `src/features/<name>/` with this layout:

```
src/features/<name>/
├── components/        # UI specific to this feature
├── hooks/             # Feature-specific React hooks
├── actions/           # Next.js Server Actions
├── api/               # TanStack Query hooks + fetch functions
├── schemas/           # Zod schemas (forms + API validation)
├── types/             # Feature-local TypeScript types
└── index.ts           # Barrel export
```

Rules:
- All feature-local TypeScript types go in the `types/` folder, not inline
- All Zod schemas go in the `schemas/` folder
- API calls and TanStack Query hooks go in the `api/` folder
- Barrel export public API from `index.ts`

---

## 5. Page Structure

Every route page (`page.tsx`) follows this pattern:

```tsx
// src/app/(dashboard)/campaigns/page.tsx

import { CampaignListing } from '@/features/campaigns';

export default function CampaignsPage() {
  return <CampaignListing />;
}
```

The page file stays **thin** — it only renders the feature's listing/root component. All logic lives inside the feature module.

### 5.1 Feature Listing Component

The main feature component handles data fetching states. It is the **only** place where `isLoading`, `isError`, and `data` checks happen:

```tsx
// src/features/campaigns/components/campaign-listing.tsx
'use client';

import { useCampaigns } from '@/features/campaigns/api/use-campaigns';
import { CampaignList } from './campaign-list';
import { CampaignListSkeleton } from './campaign-list-skeleton';
import { ErrorState } from '@/components/shared/error-state';

export function CampaignListing() {
  const { data, isLoading, isError, error } = useCampaigns();

  if (isLoading) {
    return <CampaignListSkeleton />;
  }

  if (isError) {
    return <ErrorState message={error?.message} />;
  }

  if (!data?.length) {
    return <EmptyState title="No campaigns yet" />;
  }

  return <CampaignList campaigns={data} />;
}
```

Child components below the listing component receive **already-resolved data** as props. They do NOT check loading/error states.

---

## 6. Optional Chaining

Always use **optional chaining** (`?.`) and **nullish coalescing** (`??`) when accessing potentially undefined properties:

```tsx
// CORRECT
const name = user?.profile?.firstName ?? 'Anonymous';
const count = data?.items?.length ?? 0;

// WRONG
const name = user && user.profile && user.profile.firstName ? user.profile.firstName : 'Anonymous';
```

---

## 7. Performance Optimization

Apply React performance patterns where they provide measurable benefit:

### 7.1 `React.memo`

Wrap components that receive the same props frequently but whose parent re-renders often:

```tsx
import { memo } from 'react';

interface DonorCardProps {
  donor: Donor;
  onSelect: (id: string) => void;
}

export const DonorCard = memo(function DonorCard({ donor, onSelect }: DonorCardProps) {
  return (
    <div onClick={() => onSelect(donor.id)}>
      <h3>{donor?.name}</h3>
      <p>{donor?.email}</p>
    </div>
  );
});
```

### 7.2 `useCallback`

Stabilize callback references passed to memoized children or used in dependency arrays:

```tsx
const handleSelect = useCallback((id: string) => {
  setSelectedId(id);
}, []);

const handleSearch = useCallback((query: string) => {
  setSearchParams((prev) => ({ ...prev, query }));
}, []);
```

### 7.3 `useMemo`

Memoize expensive computations and derived data:

```tsx
const filteredDonors = useMemo(
  () => donors?.filter((d) => d?.name?.toLowerCase().includes(search.toLowerCase())) ?? [],
  [donors, search],
);

const totalAmount = useMemo(
  () => donations?.reduce((sum, d) => sum + (d?.amount ?? 0), 0) ?? 0,
  [donations],
);
```

### 7.4 When to Optimize

- Lists rendering 20+ items — memoize list item components
- Callbacks passed as props to memoized children — use `useCallback`
- Filtering, sorting, or aggregating arrays — use `useMemo`
- Do NOT prematurely optimize simple components with few re-renders

---

## 8. TypeScript Types

### 8.1 Type Location

| Scope | Location |
|---|---|
| Shared between frontend + backend | `shared/types/` |
| Used across multiple features | `src/types/` |
| Specific to one feature | `src/features/<name>/types/` |

### 8.2 Rules

- Define types in dedicated type files, not inline in components
- Use `interface` for object shapes, `type` for unions/intersections/utility types
- Export types from barrel `index.ts` files
- Use `import type` for type-only imports
- Avoid `any` — use `unknown` and narrow with type guards

```tsx
// src/features/campaigns/types/campaign.types.ts
import type { BaseEntity } from '@/types';

export interface Campaign extends BaseEntity {
  title: string;
  goal: number;
  raised: number;
  status: CampaignStatus;
}

export type CampaignStatus = 'draft' | 'active' | 'completed' | 'cancelled';
```

---

## 9. Data Fetching Pattern

All API calls go through TanStack Query hooks inside the feature's `api/` folder:

```tsx
// src/features/campaigns/api/use-campaigns.ts
import { useQuery } from '@tanstack/react-query';
import type { Campaign } from '@/features/campaigns/types';

async function fetchCampaigns(): Promise<Campaign[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/campaigns`);
  if (!res.ok) throw new Error('Failed to fetch campaigns');
  return res.json();
}

export function useCampaigns() {
  return useQuery({
    queryKey: ['campaigns'],
    queryFn: fetchCampaigns,
  });
}
```

Mutations follow the same pattern:

```tsx
// src/features/campaigns/api/use-create-campaign.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCampaignInput) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/campaigns`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create campaign');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
  });
}
```

---

## 10. Forms

Always follow this pattern:

1. Define Zod schema in `features/<name>/schemas/`
2. Infer TypeScript type with `z.infer<typeof schema>`
3. Use `react-hook-form` with `zodResolver`
4. Render with shadcn Form components

```tsx
// src/features/campaigns/schemas/create-campaign.schema.ts
import { z } from 'zod';

export const createCampaignSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  goal: z.number().positive('Goal must be positive'),
  description: z.string().optional(),
});

export type CreateCampaignInput = z.infer<typeof createCampaignSchema>;
```

---

## 11. State Management

- **Server state**: TanStack Query — all API data goes through query hooks
- **Client state**: Zustand stores in `src/store/`
- Do NOT use React Context for frequently changing state
- Do NOT store server data in Zustand — let TanStack Query manage it

---

## 12. Imports

- Always use path aliases (`@/`, `@shared/`)
- Never use relative imports like `../../../`
- Use `import type` for type-only imports

```tsx
// CORRECT
import { Button } from '@/components/ui/button';
import type { Campaign } from '@/features/campaigns/types';
import type { ApiResponse } from '@shared/types';

// WRONG
import { Button } from '../../../components/ui/button';
```

---

## 13. Styling

- Use Tailwind CSS utility classes exclusively
- No inline `style` props unless absolutely necessary (e.g., dynamic values from JS)
- No CSS modules or styled-components
- Follow mobile-first ordering of responsive classes

---

## 14. Accessibility

- All interactive elements must be keyboard-accessible
- Use semantic HTML elements (`button`, `nav`, `main`, `section`, `article`)
- Include `aria-label` on icon-only buttons
- Ensure sufficient color contrast (WCAG AA minimum)

---

## 15. Checklist Before Submitting Frontend Code

- [ ] Mobile-first responsive design verified
- [ ] No file exceeds 1000 lines
- [ ] Reusable components are in `ui/` or `shared/`, not duplicated
- [ ] Types are in dedicated type files
- [ ] Optional chaining used for nullable access
- [ ] Performance hooks (`memo`, `useCallback`, `useMemo`) applied where beneficial
- [ ] Loading, error, and empty states handled in the listing component
- [ ] Path aliases used for all imports
- [ ] `pnpm format` and `pnpm lint` pass
