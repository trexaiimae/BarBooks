# Use official Node image with Cypress dependencies
FROM cypress/base:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy project files
COPY . .

# Default command
CMD ["npx", "cypress", "run", "--headless"]
