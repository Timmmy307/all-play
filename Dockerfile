# Use a lightweight Node.js image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose the port for the Node.js server
EXPOSE 3000

# Command to start the server
CMD ["npm", "start"]
