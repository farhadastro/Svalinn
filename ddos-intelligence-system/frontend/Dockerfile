# Stage 1: Build the React application
FROM node:20-slim AS build

WORKDIR /app

# Use npm ci for faster, more reliable builds
COPY package*.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Set environment variables for build
ARG VITE_WS_URL
ENV VITE_WS_URL=$VITE_WS_URL

# Build the application
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:stable-alpine

# Use an unprivileged user where possible, drop default config, add compression headers if possible
# Copy the build output to the Nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
