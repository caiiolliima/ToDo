# Análise Geral do Projeto - Visão Executiva

## Plano Mestre

> **Referência central:** [00 - Master Plan](00-master-plan.md)

Este projeto segue uma arquitetura full-stack com microserviços (Auth + Tasks), DDD, TDD, e frontend React com Jotai.

---

## Sub-planos (Ordem de Execução)

| # | Plano | Descrição | Dependências |
|---|-------|-----------|--------------|
| 01 | [Backend Infra](01-backend-infra.md) | Docker Compose, PostgreSQL, monorepo pnpm | - |
| 02 | [Auth Service](02-auth-service.md) | Microserviço Auth com DDD, TDD, JWT | 01 |
| 03 | [Tasks Service](03-tasks-service.md) | Microserviço Tasks com DDD, TDD, CRUD | 01, 02 |
| 04 | [Frontend Refactor](04-frontend-refactor.md) | Jotai, TanStack Query, integração API | 02, 03 |
| 05 | [Quality & DevOps](05-quality-devops.md) | CI/CD, testes E2E, Prettier | 04 |

---

## Estrutura do Monorepo

| Caminho | Stack | Descrição |
|---------|-------|-----------|
| apps/frontend | React 19, Vite, Tailwind, Jotai, TanStack Query | App principal |
| services/auth-service | Node.js, TypeScript, Express, Prisma, DDD | Autenticação JWT |
| services/tasks-service | Node.js, TypeScript, Express, Prisma, DDD | CRUD de tarefas |

---

## Ordem de Execução Sugerida

1. **01** - Infraestrutura (Docker, monorepo)
2. **02** - Auth Service
3. **03** - Tasks Service
4. **04** - Frontend Refactor
5. **05** - Qualidade e DevOps

---

## Planos Legados (referência)

| Plano | Descrição |
|-------|-----------|
| [01 - React toDoList](01-react-todolist.md) | Plano original (substituído pelo Master) |
| [02 - Flask Auth](02-flask-auth.md) | Flask (substituído por Node.js Auth Service) |
| [03 - Monorepo](03-monorepo-estrutura.md) | Estrutura (implementado em 01) |
| [04 - Integração](04-integracao-frontend-backend.md) | Integração (implementado em 04) |
| [05 - Qualidade](05-qualidade-devops.md) | DevOps (implementado em 05) |
