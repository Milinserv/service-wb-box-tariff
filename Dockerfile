# your node version
FROM node:20-alpine AS deps-prod

WORKDIR /app

COPY ./package*.json .

RUN npm install --omit=dev

FROM deps-prod AS build

RUN npm install --include=dev

COPY . .

RUN npm run build

FROM node:20-alpine AS prod

WORKDIR /app

COPY ./src/secrets ./src/secrets

RUN mkdir -p /app/src/log && touch /app/src/log/app.log

COPY --from=build /app/package*.json .
COPY --from=deps-prod /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist