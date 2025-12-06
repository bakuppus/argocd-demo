# ----------------------------------------------------
# 1️⃣ Build Stage — Build the Vite React App
# ----------------------------------------------------
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy all application files
COPY . .

# Build optimized static files
RUN npm run build


# ----------------------------------------------------
# 2️⃣ Production Stage — Serve with NGINX
# ----------------------------------------------------
FROM nginx:1.25-alpine

# Remove default NGINX content
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: custom nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port (matches Service port 80)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
