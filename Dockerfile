# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy source files
COPY . .

# Build if needed (uncomment if using build steps)
# RUN npm run build

# Expose port (match serverConfig.PORT)
EXPOSE 4000

# Start the server
CMD ["node", "dist/index.js"]
