FROM node:20

# Set working directory
WORKDIR /app

# Copy only package.json and yarn.lock for dependency installation
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the frontend code
COPY . ./

# Expose the port for the React app
EXPOSE 5173

# Start the app and make it accessible on all network interfaces
CMD ["yarn", "dev", "--host", "0.0.0.0"]
