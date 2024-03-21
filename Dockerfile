FROM node:21-alpine AS build

WORKDIR /app
RUN chown -R node:node .
USER node

ADD --chown=node:node package*.json ./
RUN npm ci

ADD --chown=node:node lib/ ./lib/
ADD --chown=node:node specs/ ./specs/
ADD --chown=node:node tldr.l tldr.yy ./

RUN npm run jison
RUN npm run test

ENTRYPOINT ["node", "lib/tldr-lint-cli.js"]
