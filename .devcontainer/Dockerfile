FROM node:20-alpine

# Install global tools
RUN npm install -g nodemon vite

# Install Git
RUN apk add --no-cache git

# Set up working directory (no COPY)
WORKDIR /workspace

# Install dependencies (we’ll handle this in postCreateCommand)
# RUN npm install  <-- ❌ skip this here to avoid issues on first build

# Expose ports
EXPOSE 3001
EXPOSE 5173

# Start backend and frontend
CMD ["sh", "-c", "nodemon backend/index.js & vite --host --port 5173 --config frontend/vite.config.ts"]
