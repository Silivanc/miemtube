FROM node:18.18

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

RUN npm install -g serve

COPY . /usr/src/app
RUN npm run build
EXPOSE 5173

CMD ["serve", "-s", "./dist", "-l", "tcp://0.0.0.0:5173"]