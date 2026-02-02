# Plano 02 - Auth Service (Subtask)

> **Plano pai:** [Master Plan](00-master-plan.md)
> **Dependência:** [01 - Backend Infra](01-backend-infra.md)

## Objetivo

Implementar microserviço de autenticação com DDD, TDD, JWT e PostgreSQL (Prisma).

---

## Arquitetura DDD

```
services/auth-service/src/
├── domain/
│   ├── entities/user.entity.ts
│   ├── value-objects/email.vo.ts
│   └── repositories/user.repository.interface.ts
├── application/
│   ├── use-cases/register-user.use-case.ts
│   ├── use-cases/login.use-case.ts
│   └── dto/
├── infrastructure/
│   ├── database/prisma/
│   └── database/user.repository.impl.ts
└── presentation/http/
    ├── auth.controller.ts
    └── auth.routes.ts
```

---

## Checklist de Implementação (TDD)

- [ ] Configurar Prisma com PostgreSQL
- [ ] Criar schema User (id, email, passwordHash, name, createdAt)
- [ ] Implementar Email value object (domain)
- [ ] Implementar User entity (domain)
- [ ] Criar UserRepository interface (domain)
- [ ] Implementar UserRepository com Prisma (infrastructure)
- [ ] Use case: RegisterUser (com testes unitários primeiro)
- [ ] Use case: Login (com testes unitários primeiro)
- [ ] Controller: POST /auth/register, POST /auth/login
- [ ] Gerar e retornar JWT no login
- [ ] Middleware de validação JWT (para Tasks Service consumir)
- [ ] Testes de integração com supertest
- [ ] Dockerfile para auth-service

---

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /auth/register | Registrar usuário (email, password, name) |
| POST | /auth/login | Login (email, password) → JWT |
| GET | /auth/me | Validar token (opcional) |

---

## Dependências

- express, cors
- prisma, @prisma/client
- bcrypt (hash de senha)
- jsonwebtoken
- vitest, supertest (TDD)
