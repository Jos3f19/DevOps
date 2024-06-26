# Use node v20 as the base image
FROM node:19

# Set the working directory in the container
WORKDIR /usr/src/app

ENV HOST 0.0.0.0
# Expose the port the app runs on
EXPOSE 8080

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install -g nodemon

# Copy the rest of the application
COPY . .

# Command to run the application
CMD ["npm", "start"]