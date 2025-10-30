# Multi-stage build for optimized production image

# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

ARG VITE_CANDIDATES_ENDPOINT
ENV VITE_CANDIDATES_ENDPOINT=${VITE_CANDIDATES_ENDPOINT}

# Build the application
RUN npm run build

# Production stage
FROM node:22-alpine AS production

WORKDIR /app

# Install serve globally to serve the built files
RUN npm install -g serve

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Create a non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S reactuser -u 1001 -G nodejs

# Change ownership of the app directory
RUN chown -R reactuser:nodejs /app

# Switch to non-root user
USER reactuser

# Expose port (will be mapped by Dokploy)
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Start the application using serve
CMD ["serve", "-s", "dist", "-l", "3000"]
