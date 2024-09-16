FROM node:18.17.1

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package.json package-lock.json ./ 

# Clean npm cache
RUN npm cache clean --force

# Set npm network timeout to 10 minutes (600000 milliseconds)
RUN npm config set fetch-timeout 600000
RUN npm config set connect-timeout 600000

# Optionally, use a different npm registry
RUN npm config set registry https://registry.npmjs.org/

# Update npm to the latest version
RUN npm install -g npm@latest

# Install dependencies
RUN npm install

# Copy the rest of your application's code
COPY . .

# Build the Vite application
RUN npm run build

# Expose port 5173 for the Vite preview server
EXPOSE 5173

# Start the Vite preview server
CMD ["npm", "run", "dev"]
