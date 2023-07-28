FROM node:18.13.0

WORKDIR /srv/app

COPY package*.json ./

COPY prisma ./prisma/

COPY .env ./

COPY tsconfig.json ./

COPY . .

RUN npm install && npx prisma generate

EXPOSE 3001

CMD npm start