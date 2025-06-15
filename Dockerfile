FROM node:22

WORKDIR /app

COPY . .

RUN npm install
run npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]