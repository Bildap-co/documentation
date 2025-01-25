---
sidebar_position: 2
---

# Containerization

We use docker to containerize the deployment. the following will explain how the `Dockerfile` is configured.

```docker
FROM node:20.11.1

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Prisma Client with the correct binary for linux-arm64-openssl-3.0.x
RUN npm install @prisma/client@6.0.1

# Copy the rest of the application code
COPY . .

# # Generate Prisma Client
RUN npx prisma generate

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
```
