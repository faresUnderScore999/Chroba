# Use the official Node.js image as a base image
FROM node:20-alpine

# Set the working directory
WORKDIR /home/myapp

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy the rest of your Nuxt.js application code
COPY . .

# Build the Nuxt.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
