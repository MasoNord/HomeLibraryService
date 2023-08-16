
FROM node:lts-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

ENV PORT=4000

EXPOSE ${PORT}

CMD ["npm", "start"]


