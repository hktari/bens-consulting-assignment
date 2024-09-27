FROM node:20.9.0-slim

# Set the working directory
WORKDIR /app

# Copy the backend folder contents to the working directory
COPY data/ data/

COPY generateDb.js .

# Start the json-server
CMD ["node", "./generateDb.js"]