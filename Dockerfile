FROM node:22.13.1 AS builder

ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXT_PUBLIC_FRONTEND_URL

# Create build directory
WORKDIR /build

COPY . ./

# Install build dependencies
RUN npm install
RUN npm run build

FROM node:22.13.1-alpine as jeteo-api

COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/apps/api/package*.json ./
COPY --from=builder /build/apps/api/.nest ./.nest
COPY --from=builder /build/apps/api/prisma ./prisma
COPY --from=builder /build/packages/shared/.dist ./node_modules/shared

EXPOSE 3001

CMD [ "npm", "run", "start:migrate:prod" ]

FROM node:22.13.1-alpine AS jeteo-web
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /build/apps/web/.next ./.next
COPY --from=builder /build/apps/web/next.config.js ./
COPY --from=builder /build/apps/web/package.json ./package.json
COPY --from=builder /build/node_modules ./node_modules

USER nextjs

EXPOSE 3000

CMD ["npm", "start"]
