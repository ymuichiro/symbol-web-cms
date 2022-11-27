FROM node:16-alpine3.16 as StrapiApp

COPY ./backend /workspace
WORKDIR /workspace

RUN npm ci && npm run build
EXPOSE 1337
CMD [ "npm", "start"]