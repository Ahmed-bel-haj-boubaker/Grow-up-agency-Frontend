FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the application
RUN npm run build

# Expose port and start the application
EXPOSE 5173
CMD ["npm", "run", "dev"]
