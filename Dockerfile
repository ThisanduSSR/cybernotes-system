# Multi-stage build for frontend
FROM node:18-alpine as frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Backend stage
FROM openjdk:21-jdk-slim
WORKDIR /app

# Copy built frontend
COPY --from=frontend-build /app/frontend/build ./backend/backend/backend/target/static

# Copy backend
COPY backend/backend/backend/target/*.jar app.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]

# Developer Note: Multi-stage build copies React assets directly into static folder
