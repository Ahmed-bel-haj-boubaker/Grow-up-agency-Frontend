# Use the official Node.js 18 image based on Alpine
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package.json package-lock.json ./

# Set npm configuration to retry in case of network issues and increase timeout
RUN npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm config set fetch-timeout 120000

# Install dependencies using npm ci for faster and reliable installs
RUN npm ci --verbose

# Copy the rest of the application code
COPY . .

# Build the application (adjust this command if needed for your build process)
RUN npm run build

# Expose the port the app runs on
EXPOSE 5173

# Start the application in development mode
CMD ["npm", "run", "dev"]
