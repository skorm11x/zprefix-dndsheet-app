FROM node:latest
RUN mkdir ui

WORKDIR /ui

COPY package.json . 

RUN npm install

COPY . ./

EXPOSE 5173

CMD ["npm", "start"]