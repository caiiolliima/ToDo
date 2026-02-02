# Plano 03 - Tasks Service (Subtask)

> **Plano pai:** [Master Plan](00-master-plan.md)
> **Dependências:** [01 - Backend Infra](01-backend-infra.md), [02 - Auth Service](02-auth-service.md)

## Objetivo

Implementar microserviço de tarefas com DDD, TDD, CRUD e PostgreSQL (Prisma). Valida JWT emitido pelo Auth Service.

---

## Arquitetura DDD

```
services/tasks-service/src/
├── domain/
│   ├── entities/task.entity.ts
│   ├── value-objects/task-id.vo.ts
│   └── repositories/task.repository.interface.ts
├── application/
│   ├── use-cases/create-task.use-case.ts
│   ├── use-cases/update-task.use-case.ts
│   ├── use-cases/delete-task.use-case.ts
│   ├── use-cases/list-tasks.use-case.ts
│   └── dto/
├── infrastructure/
│   ├── database/prisma/
│   ├── database/task.repository.impl.ts
│   └── http/auth.middleware.ts
└── presentation/http/
    ├── task.controller.ts
    └── task.routes.ts
```

---

## Checklist de Implementação (TDD)

- [ ] Configurar Prisma com PostgreSQL
- [ ] Criar schema Task (id, title, concluded, userId, createdAt)
- [ ] Implementar TaskId value object
- [ ] Implementar Task entity (domain)
- [ ] Criar TaskRepository interface
- [ ] Implementar TaskRepository com Prisma
- [ ] Middleware: validar JWT (Bearer token) e extrair userId
- [ ] Use case: CreateTask (TDD)
- [ ] Use case: UpdateTask (TDD)
- [ ] Use case: DeleteTask (TDD)
- [ ] Use case: ListTasks (TDD, filtrar por userId)
- [ ] Controller: GET, POST, PUT, DELETE /tasks
- [ ] Testes de integração
- [ ] Dockerfile para tasks-service

---

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /tasks | Listar tasks do usuário autenticado |
| POST | /tasks | Criar task |
| PUT | /tasks/:id | Atualizar task |
| DELETE | /tasks/:id | Deletar task |

---

## Modelo Task

- id: string (nanoid ou uuid)
- title: string
- concluded: boolean
- state: "Creating" | "Created" (compatível com frontend)
- userId: string
