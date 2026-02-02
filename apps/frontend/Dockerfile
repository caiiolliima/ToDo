FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN npm install

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG VITE_AUTH_API_URL=http://localhost:3001
ARG VITE_TASKS_API_URL=http://localhost:3002
ENV VITE_AUTH_API_URL=$VITE_AUTH_API_URL
ENV VITE_TASKS_API_URL=$VITE_TASKS_API_URL
RUN npm run build

FROM nginx:alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
