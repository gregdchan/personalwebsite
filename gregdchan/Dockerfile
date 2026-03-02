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
FROM node:20-alpine

WORKDIR /app

# Install sirv-cli (more robust and lighter than 'serve' for Railway)
RUN npm install -g sirv-cli

# Copy the built static studio from builder
COPY --from=builder /app/dist ./dist

# Railway sets PORT dynamically
ENV PORT=3333

EXPOSE $PORT

# Sirv is better at handling the dynamic PORT on various platforms
CMD sirv dist --port $PORT --single --host 0.0.0.0