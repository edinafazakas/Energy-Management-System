FROM node:14.17.1 AS builder

WORKDIR /EnergyManagementSystemFrontend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

CMD ["npm", "start", "--", "--host", "0.0.0.0", "--port", "3000"]
