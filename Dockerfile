FROM node:17-alpine AS development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install glob rimraf
RUN npm install --only=development
# should mount the project to /usr/src/app

#------------------------------------------------------------------------------

FROM node:17-alpine As build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=development
COPY . .
RUN npm run build

#------------------------------------------------------------------------------
FROM node:17-alpine As production
RUN apk add dumb-init
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

USER node
WORKDIR /usr/src/app
COPY package*.json ./
# RUN npm install --only=production
RUN npm ci --only=production
COPY --chown=node:node . .
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
CMD ["dumb-init", "node", "dist/main"]