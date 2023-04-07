FROM node:19.6.0-alpine
WORKDIR /server/
COPY package*.json /server/
RUN npm install
COPY . /server/

EXPOSE 7000
CMD ["npm", "run", "dev"]