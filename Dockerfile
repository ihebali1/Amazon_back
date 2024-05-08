# Stage 0, "build-stage", based on Node.js 14, to build and compile NestJS
FROM node:14 as build-stage

WORKDIR /app

COPY ./package*.json ./

RUN npm ci

COPY . /app

RUN npm run build --prod

# Stage 1, based on Node.js 14-alpine, to have only the dist, ready for production
FROM node:14-alpine as amazon

WORKDIR /usr/src/app

COPY --from=build-stage /app/package*.json ./
COPY --from=build-stage /app/node_modules ./node_modules
COPY --from=build-stage /app/dist ./dist
COPY --from=build-stage /app/templates ./templates

RUN mkdir -p ./logs ./uploads

#EXPOSE 3000

CMD [ "npm", "run", "start:prod"]