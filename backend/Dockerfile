# Use a lightweight Node.js image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package files to the container
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the application source code to the container
COPY . .

# Expose the application port
EXPOSE 3000

# Use CMD to run the development server
CMD ["yarn", "start:dev"]
