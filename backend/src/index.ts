import * as bodyParser from 'body-parser';
import express from 'express';
import { dbConfig } from './models';

export function expressApp() {
  dbConfig
    .authenticate()
    .then(() => console.log('SUCCESS: connected to db'))
    .catch(() => {
      throw 'error';
    });

  const app: express.Application = express();
  const APP_PORT = Number(process.env.PORT) || 3333;

  if (process.env.NODE_ENV === 'production') {
    app.use(require('helmet')());
    app.use(require('compression')());
  } else {
    app.use(require('cors')());
  }

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true, limit: '5m' }));

  app.get('/', (req, res, next) => {
    res.send('olá mundo');
  });

  app.listen(APP_PORT, () => {
    console.log(`SUCCESS: server runnig in port ${APP_PORT}`);
  });

  return app;
}
