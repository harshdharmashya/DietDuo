# ==========================================
# Stage 1: Base & Dependencies
# ==========================================
FROM node:20-slim AS base
WORKDIR /app

# Install dependencies based on package-lock.json
COPY package.json package-lock.json ./
RUN npm ci

# ==========================================
# Stage 2: Development (Hot Reloading)
# ==========================================
FROM base AS dev
WORKDIR /app

# Copy the rest of the project source code
COPY . .

# Expose Vite development port
EXPOSE 5173

# Run Vite dev server with host 0.0.0.0
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]

# ==========================================
# Stage 3: Builder (Production Build)
# ==========================================
FROM base AS builder
WORKDIR /app

# Vite environment variables are baked in at build time
ARG VITE_BACKEND_URL=https://diet-duo-backend.vercel.app
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

COPY . .
RUN npm run build

# ==========================================
# Stage 4: Production Server (Nginx)
# ==========================================
FROM nginx:alpine AS production

# Copy custom Nginx configuration for Single Page Application routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose web server port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

