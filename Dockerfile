FROM node:latest

ADD ./prestonlloyd.com /opt/prestonlloyd
WORKDIR /opt/prestonlloyd

RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
