# ── Stage 1: Build ──────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files (including lockfile if it exists)
# Explicitly copy it because .gitignore was previously blocking it!
COPY package.json package-lock.json* ./

# Using npm install instead of npm ci for better resilience in all environments
# Especially if the lockfile was missing from the build context!
RUN npm install

# Copy source code
COPY . .

# Build-time args for Vite (VITE_* vars must exist during build)
ARG VITE_API_URL
ARG PUBLIC_SANITY_PROJECT_ID
ARG PUBLIC_SANITY_DATASET

# Ensure these are available at build time
ENV VITE_API_URL=$VITE_API_URL
ENV PUBLIC_SANITY_PROJECT_ID=$PUBLIC_SANITY_PROJECT_ID
ENV PUBLIC_SANITY_DATASET=$PUBLIC_SANITY_DATASET

# Build the SvelteKit app (adapter-node → ./build)
RUN npm run build

# ── Stage 2: Production ────────────────────────────────────
FROM node:20-alpine

WORKDIR /app

# Copy package files and install prod-only deps
COPY package.json package-lock.json* ./
RUN npm install --omit=dev

# Copy the built app from the builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./

# Railway sets PORT dynamically — default to 3000 for local testing
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE $PORT

# SvelteKit with adapter-node listens on PORT env
CMD ["node", "build"]