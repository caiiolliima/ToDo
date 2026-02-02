# Plano 01 - Backend Infraestrutura (Subtask)

> **Plano pai:** [Master Plan](00-master-plan.md)

## Objetivo

Configurar monorepo com pnpm workspaces, Docker Compose, PostgreSQL e estrutura base para os microserviços Auth e Tasks.

---

## Checklist de Implementação

- [ ] Criar `pnpm-workspace.yaml` na raiz
- [ ] Criar `package.json` root com scripts do workspace
- [ ] Reorganizar pastas: `apps/frontend/`, `services/auth-service/`, `services/tasks-service/`
- [ ] Mover código React atual para `apps/frontend/`
- [ ] Criar `docker-compose.yml` (produção)
- [ ] Criar `docker-compose.dev.yml` (desenvolvimento com volumes)
- [ ] Configurar containers PostgreSQL para auth-db e tasks-db
- [ ] Criar `.env.example` na raiz com variáveis necessárias
- [ ] Documentar comandos `pnpm install`, `pnpm dev`, `docker-compose up`

---

## Estrutura de Pastas Esperada

```
toDoList/
├── apps/
│   └── frontend/          # React app (conteúdo atual movido)
├── services/
│   ├── auth-service/      # Estrutura base (package.json, tsconfig)
│   └── tasks-service/     # Estrutura base (package.json, tsconfig)
├── docker-compose.yml
├── docker-compose.dev.yml
├── pnpm-workspace.yaml
├── package.json
└── .env.example
```

---

## Variáveis de Ambiente (.env.example)

```env
# Auth Service
AUTH_DATABASE_URL=postgresql://user:pass@localhost:5432/auth_db
JWT_SECRET=your-jwt-secret-change-in-production

# Tasks Service
TASKS_DATABASE_URL=postgresql://user:pass@localhost:5433/tasks_db
AUTH_SERVICE_URL=http://localhost:3001

# Frontend
VITE_AUTH_API_URL=http://localhost:3001
VITE_TASKS_API_URL=http://localhost:3002
```

---

## Docker Compose - Portas

| Serviço      | Porta API | Porta DB |
|--------------|-----------|----------|
| auth-service | 3001      | -        |
| auth-db      | -         | 5432     |
| tasks-service| 3002      | -        |
| tasks-db     | -         | 5433     |
| frontend     | 5173      | -        |

---

## Arquivos Principais

- [pnpm-workspace.yaml](../pnpm-workspace.yaml)
- [docker-compose.yml](../docker-compose.yml)
- [apps/frontend/](../apps/frontend/)
- [services/auth-service/](../services/auth-service/)
- [services/tasks-service/](../services/tasks-service/)
