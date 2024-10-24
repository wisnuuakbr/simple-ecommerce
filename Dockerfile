# Use node 16 as base image
FROM node:16-alpine

# Set work directory
WORKDIR /app

# Copy file package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project to container
COPY . .

# Expose port to 3000
EXPOSE 3000

# Command to run application
CMD ["npm", "run", "dev"]
