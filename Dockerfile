FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json ./
COPY node_modules ./node_modules
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]