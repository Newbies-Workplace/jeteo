FROM node:22.13.1 AS builder

# Create build directory
WORKDIR /build

COPY . ./

# Install build dependencies
RUN npm install
RUN npm run build

FROM node:22.13.1-alpine AS jeteo-app

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --chown=node:node --from=builder /build/.next ./.next
COPY --chown=node:node --from=builder /build/next.config.js ./
COPY --chown=node:node --from=builder /build/prisma ./prisma
COPY --chown=node:node --from=builder /build/package*.json ./
COPY --chown=node:node --from=builder /build/node_modules ./node_modules

USER node

EXPOSE 3000

CMD ["npm", "run", "start:migrate:prod"]
