FROM node:18.13.0

WORKDIR /srv

COPY package*.json ./

COPY prisma ./prisma/

COPY .env ./

COPY tsconfig.json ./

COPY build .

RUN npm install && npx prisma generate

EXPOSE 3001

CMD npm run prod