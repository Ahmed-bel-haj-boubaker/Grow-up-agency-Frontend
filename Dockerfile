# Use the official Node.js 18 image
FROM node:18.17.1

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package.json package-lock.json ./

# Update npm to the latest stable version to avoid deprecated warnings
RUN npm install -g npm@10.8.2

# Set a longer timeout for npm in case of network issues
RUN npm set timeout 600000

# Install dependencies with cache to avoid hitting the network where possible
RUN npm install --cache /tmp/empty-cache --prefer-offline

# Copy the rest of the application's code to the container
COPY . .

# Build the Vite application
RUN npm run build

# Expose port 5173 for the Vite preview server
EXPOSE 5173

# Start the Vite development server
CMD ["npm", "run", "dev"]
