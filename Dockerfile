FROM node:carbon
WORKDIR /server
# Install app dependencies
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8888
CMD [ "npm", "start" ]