# Use an official Node.js runtime as the base image
FROM node:14

# Copy the entire project folder to /app in the container
COPY . /app/

# Set a working directory for the frontend within the container
WORKDIR /app/frontend

# Install the client's dependencies
RUN npm install

# Build the frontend application
RUN npm run build

# Set a working directory for the backend within the container
WORKDIR /app/backend

# Install the server's dependencies
RUN npm install

# Expose the port your Node.js server will listen on (replace 3000 with your server's port)
EXPOSE 3000

# Define the command to start your Node.js server (replace with your server's start command)
CMD ["npm", "start"]
