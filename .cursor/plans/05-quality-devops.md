# Plano 05 - Quality & DevOps (Subtask)

> **Plano pai:** [Master Plan](00-master-plan.md)
> **Dependência:** [04 - Frontend Refactor](04-frontend-refactor.md)

## Objetivo

Implementar CI/CD, Prettier, testes E2E e documentação.

---

## Checklist de Implementação

- [ ] Configurar Prettier (raiz e apps/frontend)
- [ ] eslint-config-prettier para evitar conflitos
- [ ] Vitest + Testing Library no frontend (hooks, componentes)
- [ ] GitHub Actions: ci.yml
  - [ ] Lint (ESLint)
  - [ ] Testes (Vitest) frontend e services
  - [ ] Build (vite build)
  - [ ] (Opcional) Docker build
- [ ] README.md atualizado com instruções
- [ ] .env.example em apps/frontend, services/auth, services/tasks

---

## Estrutura CI

```yaml
# .github/workflows/ci.yml
jobs:
  lint:
    - pnpm install
    - pnpm lint
  test:
    - pnpm test
  build:
    - pnpm build
```

---

## Arquivos

- .prettierrc, .prettierignore
- .github/workflows/ci.yml
- README.md
