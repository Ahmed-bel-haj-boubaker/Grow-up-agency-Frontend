FROM node:18.17.1

# Set the working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Clean npm cache and configure npm
RUN npm cache clean --force && \
    npm config set fetch-timeout 1200000 && \
    npm config set registry https://registry.npmjs.com/ && \
    npm install -g npm@latest && \
    npm install --force

# Copy the rest of your application code
COPY . .

# Build the application
RUN npm run build

# Expose port and start the application
EXPOSE 5173
CMD ["npm", "run", "dev"]
