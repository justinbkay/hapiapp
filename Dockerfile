FROM node:13.11.0-alpine3.11 AS builder

WORKDIR /src
COPY . .

RUN yarn install
RUN npm run lint
RUN npm install -g typescript
RUN tsc
RUN yarn run copy-template

# App
FROM node:13.11.0-alpine3.11
ARG NODE_ENV="production"
ENV NODE_ENV $NODE_ENV
EXPOSE 3000

CMD ["node", "app.js"]

WORKDIR /app
COPY --from=builder /src/node_modules/ /app/node_modules/
COPY --from=builder /src/dist/ .
COPY --from=builder /src/config/ /app/config/