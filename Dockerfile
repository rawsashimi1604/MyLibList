FROM node:14

WORKDIR /app
COPY package.json /app
COPY . /app

CMD /bin/bash -c 'npm install; node seedDb/seedPSQL.js; node seedDb/seedMongo.js; npm run dev'


