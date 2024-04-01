FROM node:20-alpine

COPY ./ /app
WORKDIR /app

RUN npm install
RUN npm install --global coffeescript

COPY . .

EXPOSE 8000

CMD ["npm", "start"]
