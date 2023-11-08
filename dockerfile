FROM node:18.13.0

WORKDIR /trackit

COPY package.json ./

COPY prisma ./prisma/

COPY .env ./

COPY tsconfig.json ./

COPY . .

RUN npm install && npx prisma generate

RUN npm run build

RUN cd client && npm install && npm run build

EXPOSE 3001

CMD npm run prod