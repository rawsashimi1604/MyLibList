FROM node:14

WORKDIR /app
COPY package.json /app
COPY . /app

CMD /bin/bash -c 'npm install; node seedDb/seedPSQL.js; npm run dev'


