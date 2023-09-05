FROM node:14-alpine
WORKDIR /application
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3100
CMD ["npm", "run", "start:dev"]
