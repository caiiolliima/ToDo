# Plano 04 - Frontend Refactor (Subtask)

> **Plano pai:** [Master Plan](00-master-plan.md)
> **Dependências:** [02 - Auth Service](02-auth-service.md), [03 - Tasks Service](03-tasks-service.md)

## Objetivo

Refatorar frontend: Jotai para estado global, TanStack Query para API, path aliases, integração com Auth e Tasks APIs.

---

## Mudanças Principais

| Antes | Depois |
|-------|--------|
| use-local-storage | TanStack Query + Jotai |
| Math.random() IDs | nanoid |
| createdtasksCount typo | createdTasksCount |
| setIsUpdateingTask typo | setIsUpdatingTask |
| Imports relativos | Path aliases (@/) |

---

## Estrutura de Pastas

```
apps/frontend/src/
├── api/
│   ├── http.ts           # Axios/fetch base com interceptors
│   ├── auth.client.ts
│   └── tasks.client.ts
├── atoms/
│   ├── auth.atom.ts      # Jotai: token, user
│   └── task.atom.ts      # Jotai: UI state (editing, loading)
├── components/
├── core-components/
├── hooks/
│   ├── use-task.ts       # TanStack useMutation + Jotai
│   └── use-tasks.ts      # TanStack useQuery + Jotai
├── modules/task.ts
└── pages/
```

---

## Checklist de Implementação

- [ ] Instalar Jotai, @tanstack/react-query, nanoid, zod
- [ ] Configurar path aliases (vite.config, tsconfig)
- [ ] Criar http client com interceptors (JWT no header)
- [ ] Criar auth.client.ts (login, register)
- [ ] Criar tasks.client.ts (CRUD)
- [ ] Criar auth.atom.ts (token, user, setToken, logout)
- [ ] Criar task.atom.ts (estado de UI se necessário)
- [ ] Refatorar use-tasks para useQuery (fetch tasks)
- [ ] Refatorar use-task para useMutation (create, update, delete)
- [ ] Corrigir typos em task-summary (createdTasksCount)
- [ ] Corrigir typo use-task (setIsUpdatingTask)
- [ ] Substituir Math.random() por nanoid
- [ ] Tela de login (ou modal) - mínimo para obter token
- [ ] Provider: QueryClientProvider + Jotai Provider
