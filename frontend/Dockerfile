# ── Stage 1: Build ──────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDeps needed for build)
RUN npm ci

# Copy source code
COPY . .

# Build-time args for Vite (VITE_* vars must exist during build)
ARG VITE_API_URL
ARG PUBLIC_SANITY_PROJECT_ID
ARG PUBLIC_SANITY_DATASET

ENV VITE_API_URL=$VITE_API_URL
ENV PUBLIC_SANITY_PROJECT_ID=$PUBLIC_SANITY_PROJECT_ID
ENV PUBLIC_SANITY_DATASET=$PUBLIC_SANITY_DATASET

# Build the SvelteKit app (adapter-node → ./build)
RUN npm run build

# ── Stage 2: Production ────────────────────────────────────
FROM node:20-alpine

WORKDIR /app

# Copy package files and install prod-only deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy the built app from the builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./

# Railway sets PORT dynamically — default to 3000 for local testing
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE $PORT

# adapter-node reads HOST + PORT from env automatically
CMD ["node", "build"]