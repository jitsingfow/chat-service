# Set base image
FROM node:18

# Create and set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY backend/ .

# Expose port if required (e.g., 3000 for Express)
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
