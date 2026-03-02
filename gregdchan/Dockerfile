# ── Stage 1: Build ──────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDeps needed for build)
RUN npm ci

# Copy source code
COPY . .

# Build Sanity Studio (outputs to ./dist)
RUN npm run build

# ── Stage 2: Production ────────────────────────────────────
FROM node:20-alpine

WORKDIR /app

# Install a lightweight static file server
RUN npm install -g serve

# Copy the built static studio from builder
COPY --from=builder /app/dist ./dist

# Railway sets PORT dynamically — default to 3333 for local testing
ENV PORT=3333

EXPOSE $PORT

# Serve the static dist folder on Railway's dynamic port
CMD ["sh", "-c", "serve dist -l $PORT --single"]