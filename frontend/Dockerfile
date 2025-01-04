# Base image
FROM node:20

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy only necessary files for dependency installation
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the port used by Vite (default is 5173)
EXPOSE 5173

# Start the app and make it accessible on all interfaces
CMD ["yarn", "dev", "--host", "0.0.0.0"]
