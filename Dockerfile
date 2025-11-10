# ---------- Build Stage ----------
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua source code
COPY . .

# Build React app
RUN npm run build

# ---------- Production Stage ----------
FROM node:20-alpine

WORKDIR /app

# Install serve untuk host SPA
RUN npm install -g serve

# Copy hasil build sahaja
COPY --from=build /app/dist ./dist

# Expose port
EXPOSE 8080

# Start command
CMD ["serve", "-s", "dist", "-l", "8080"]
