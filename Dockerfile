FROM node:latest

WORKDIR /opt/prestonlloyd

RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
