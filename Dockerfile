# Use the latest LTS (long term support) version of node available from Docker Hub
FROM node:18.18.2

# Create a directory to hold the application code inside the image
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source by copying the entire directory (excluding items in .dockerignore)
COPY . .

# Your app binds to port 3000, so expose that port
EXPOSE 3000

# Define the command to run your app
CMD [ "node", "server.js" ]
