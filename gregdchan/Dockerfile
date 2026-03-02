# ── Stage 1: Build ──────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files (including lockfile if it exists)
COPY package.json package-lock.json* ./

# Using npm install instead of npm ci for better resilience
RUN npm install

# Copy source code
COPY . .

# Build Sanity Studio (outputs to ./dist)
RUN npm run build

# ── Stage 2: Production ────────────────────────────────────
# Production runtime
FROM node:20-alpine AS runner

WORKDIR /app

# Install sirv-cli to serve the static build
RUN npm install -g sirv-cli

# Copy built studio from builder
COPY --from=builder /app/dist ./dist

# Railway injects $PORT at runtime. bind to 0.0.0.0 so it's reachable.
# We don't hardcode PORT here to avoid overriding Railway's settings.
CMD sirv dist --port ${PORT:-3333} --host 0.0.0.0 --single --verbose