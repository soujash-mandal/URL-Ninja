# Use an official Node.js runtime as the base image
FROM node:14


# Set a working directory within the container
WORKDIR /app/backend

# Copy your Node.js server application files into the container
# COPY backend/package.json backend/package-lock.json /app/


COPY backend /app/backend/
COPY frontend/dist /app/frontend/dist

# Install the server's dependencies
RUN npm install

# Expose the port your Node.js server will listen on (replace 3000 with your server's port)
EXPOSE 3000

# Define the command to start your Node.js server (replace with your server's start command)
CMD ["npm", "start"]
