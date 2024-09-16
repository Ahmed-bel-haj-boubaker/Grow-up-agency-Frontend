
FROM node:18.17.1

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application's code
COPY . .

# Build the Vite application
RUN npm run build

# Expose port 5173 for the Vite preview server
EXPOSE 5173

# Start the Vite preview server
CMD ["npm", "run", "serve"]
