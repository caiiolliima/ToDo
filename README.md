# ToDoList - Monorepo

Full-stack ToDoList com microserviços (Auth + Tasks), DDD, TDD, Docker Compose, React, Jotai e TanStack Query.

## Estrutura

```
toDoList/
├── apps/frontend/        # React app (Vite, Jotai, TanStack Query)
├── services/
│   ├── auth-service/     # Node.js, Express, Prisma, DDD
│   └── tasks-service/    # Node.js, Express, Prisma, DDD
├── docker-compose.yml
└── .cursor/plans/        # Planos de execução
```

## Pré-requisitos

- Node.js 20+
- pnpm 8+ (ou npm 9+)
- Docker (para backend)

## Instalação

```bash
pnpm install
# ou: npm install
```

## Desenvolvimento

### Frontend (localStorage, sem backend)
```bash
pnpm dev
# Abre em http://localhost:5173
```

### Backend com Docker
```bash
docker-compose up -d
# auth-db: 5432, tasks-db: 5433
# auth-service: 3001, tasks-service: 3002
```

### Backend (dev local)
```bash
# Terminal 1: databases
docker-compose -f docker-compose.dev.yml up -d

# Terminal 2: auth-service
cd services/auth-service && pnpm db:push && pnpm dev

# Terminal 3: tasks-service
cd services/tasks-service && pnpm db:push && pnpm dev
```

## Scripts

| Script | Descrição |
|--------|-----------|
| `pnpm dev` | Frontend em modo dev |
| `pnpm dev:auth` | Auth service em modo dev |
| `pnpm dev:tasks` | Tasks service em modo dev |
| `pnpm build` | Build do frontend |
| `pnpm lint` | ESLint no frontend |
| `pnpm test` | Vitest no frontend |

## Variáveis de Ambiente

Copie `.env.example` para `.env` e ajuste conforme necessário.

## Planos

Consulte [.cursor/plans/00-master-plan.md](.cursor/plans/00-master-plan.md) para o plano mestre e sub-planos.
