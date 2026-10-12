# Nehemiah

Full-stack monorepo — Next.js frontend + NestJS backend with PostgreSQL, Redis, MinIO, and Mailpit.

## Tech Stack

| Layer      | Tech                                                        |
|------------|-------------------------------------------------------------|
| Frontend   | Next.js 15, React 19, TypeScript, Tailwind CSS v4, shadcn/ui |
| Backend    | NestJS, Fastify, Drizzle ORM, Repository Pattern            |
| Database   | PostgreSQL 16                                               |
| Cache      | Redis 7                                                     |
| Storage    | MinIO (dev) / Cloudflare R2 (prod)                          |
| Mail       | Mailpit (dev)                                               |
| Testing    | Vitest + Playwright (frontend) / Jest + Supertest (backend) |
| CI/CD      | GitHub Actions → GHCR → VPS deploy                         |
| Infra      | Docker Compose (dev + prod), Traefik (prod SSL)             |

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 20+
- [pnpm](https://pnpm.io/) 9+
- [Docker](https://www.docker.com/) & Docker Compose

### Setup

```bash
# Clone and enter
git clone <your-repo-url>
cd nehemiah

# Copy env files
cp .env.example .env
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env

# Start Postgres, pgAdmin, backend and frontend
docker compose up
```

### Run without Docker

```bash
# Frontend (requires backend services running)
cd frontend && pnpm install && pnpm dev

# Backend (requires Postgres)
cd backend && pnpm install && pnpm dev
```

## Service URLs (Development)

| Service   | URL                          | Purpose            |
|-----------|------------------------------|---------------------|
| Frontend  | http://localhost:3000         | Next.js app         |
| Backend   | http://localhost:8000/api/v1  | NestJS API          |
| pgAdmin   | http://localhost:5050         | Postgres GUI        |

**pgAdmin login:** `PGADMIN_DEFAULT_EMAIL` / `PGADMIN_DEFAULT_PASSWORD` from the root `.env` (defaults `admin@example.com` / `admin`; bound to localhost only)

Redis, MinIO and Mailpit are added to the stack together with the backend modules that use them.

## Project Structure

```
nehemiah/
├── frontend/          # Next.js app
│   ├── src/
│   │   ├── app/       # App Router pages & layouts
│   │   ├── features/  # Feature modules (contact, donation, events, ...)
│   │   ├── shared/    # components/ (ui, layout, common), hooks/, lib/ (api-client, cn())
│   │   ├── providers/ # React context providers
│   │   └── store/     # Zustand stores
│   └── tests/         # unit/ (Vitest) + e2e/ (Playwright)
│
├── backend/           # NestJS app
│   ├── src/
│   │   ├── modules/   # Feature modules (system, ...)
│   │   ├── common/    # Guards, filters, interceptors, pipes
│   │   ├── config/    # App, database, JWT configuration
│   │   └── database/  # Drizzle schema and migrations
│   └── test/          # E2E + integration suites
│
├── .github/workflows/ # CI
├── docker-compose.yml          # Dev environment
├── docker-compose.test.yml     # Disposable Postgres + Mailpit for e2e/integration tests
└── docker-compose.prod.yml     # Production (Traefik + GHCR)
```

## Scripts

### Root

| Command              | Description                        |
|----------------------|------------------------------------|
| `pnpm dev`           | Start all services via Docker      |
| `pnpm dev:frontend`  | Run frontend only                  |
| `pnpm dev:backend`   | Run backend only                   |
| `pnpm build`         | Build all Docker images            |
| `pnpm test`          | Run all tests                      |
| `pnpm lint`          | Lint both apps                     |

### Frontend (`cd frontend`)

| Command              | Description                        |
|----------------------|------------------------------------|
| `pnpm dev`           | Start dev server                   |
| `pnpm build`         | Production build                   |
| `pnpm test`          | Run unit tests (Vitest)            |
| `pnpm test:e2e`      | Run E2E tests (Playwright)         |
| `pnpm lint`          | Lint with ESLint                   |
| `pnpm format`        | Format with Prettier               |

### Backend (`cd backend`)

| Command              | Description                        |
|----------------------|------------------------------------|
| `pnpm dev`           | Start with watch mode              |
| `pnpm build`         | Build for production               |
| `pnpm test`          | Run unit tests (Jest)              |
| `pnpm test:e2e`      | Run E2E tests                      |
| `pnpm db:generate`   | Generate migration from schema diff|
| `pnpm db:migrate`    | Apply pending migrations           |
| `pnpm db:check`      | Check the migration chain          |
| `pnpm db:studio`     | Open Drizzle Studio (visual DB)    |
| `pnpm lint`          | Lint with ESLint                   |
| `pnpm format`        | Format with Prettier               |

## Backend Architecture

The backend uses **Drizzle ORM** with the **Repository Pattern**:

```
Module
├── controllers/    # HTTP layer — route handlers
├── services/       # Business logic — depends on repository interface
├── repositories/   # Data access — Drizzle implementation
├── dto/            # Data transfer objects (class-validator)
└── interfaces/     # Repository contracts
```

Database schemas are defined in `src/database/schema/` using Drizzle's `pgTable()` builder. Services depend on repository **interfaces**, not implementations. Repositories are injected via NestJS DI using tokens. `src/modules/system/` is a small reference implementation.

## CI/CD

`.github/workflows/ci.yml` runs on every pull request and on pushes to `main` and `dev`:

- **Frontend**: lint, Prettier check, typecheck, Vitest, `next build`
- **Backend**: lint, Prettier check, typecheck, unit tests with coverage thresholds, e2e and integration suites against Postgres + Mailpit service containers, `db:check`, a schema/migration parity check, build
- **Docker**: builds both production images (not pushed)

Publishing images to GHCR and deploying are not automated yet.

## Production Deployment

```bash
# On your VPS
git clone <your-repo>
cd nehemiah
cp .env.example .env                                         # DOMAIN, ACME_EMAIL, IMAGE_OWNER, OPS_BASIC_AUTH_USERS
cp backend/.env.production.example backend/.env.production   # replace every REPLACE_* value
cp frontend/.env.example frontend/.env                       # production values

docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
```

Traefik provides TLS through Let's Encrypt. A one-shot `migrate` service applies pending database migrations before the API starts. The Traefik dashboard (`traefik.<DOMAIN>`) and Dozzle (`logs.<DOMAIN>`) require the basic-auth credentials in `OPS_BASIC_AUTH_USERS`.

## Environment Variables

See [.env.example](.env.example) (Compose), [backend/.env.example](backend/.env.example), [backend/.env.production.example](backend/.env.production.example) and [frontend/.env.example](frontend/.env.example) for all available config options.
