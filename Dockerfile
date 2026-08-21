FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
# src/generated/history.json must already exist in the build context here -
# it's produced by CI's `history` step (see .woodpecker.yaml), which runs
# against the full clone before this Docker build starts. This image never
# has git or .git, deliberately (see .dockerignore).
COPY . .
RUN npx prisma generate
RUN npm run build

# @astrojs/node's standalone server (dist/server/entry.mjs) serves both the
# prerendered static assets in dist/client and the on-demand SSR/API routes
# from one process - no reverse proxy needed.
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080
ENV HOST=0.0.0.0
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
EXPOSE 8080
# Migrations run as a separate CI step (`just migrate`), never on container start.
CMD ["node", "./dist/server/entry.mjs"]
