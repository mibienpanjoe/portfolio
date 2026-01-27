# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Runtime stage
FROM node:20-alpine

WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy built assets from build stage
COPY --from=build /app/dist ./dist

# Expose port (Cloud Run sets PORT environment variable, defaulting to 8080)
EXPOSE 8080

# Copy entrypoint script
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

# Serve the application
# Use entrypoint script to handle environment variable expansion in exec form
CMD ["./entrypoint.sh"]
