FROM node:16

COPY . /workspace
WORKDIR /workspace

RUN npm run install && npm run build
CMD [ "npm", "run", "start"]