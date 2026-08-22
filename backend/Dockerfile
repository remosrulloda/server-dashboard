# syntax=docker/dockerfile:1

FROM node:24-alpine
WORKDIR .
COPY . .
RUN npm install --omit=dev
CMD ["node", "app.ts"]
EXPOSE 3000