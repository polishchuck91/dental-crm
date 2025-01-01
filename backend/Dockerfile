# Dockerfile (Backend)
FROM node:20-alpine

WORKDIR /app

# Copy only the package files to install dependencies
COPY package*.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of the code
COPY . .

# Build the TypeScript application
RUN yarn build

# Expose the application port
EXPOSE 3000

# Start the application in production mode
CMD ["yarn", "start:prod"]
