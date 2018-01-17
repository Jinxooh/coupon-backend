import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// routes
import routes from './routes';
// logger
import logger from './helper/logger';
// scheduler
import scheduler from './helper/scheduler';

dotenv.config();
const app = express();

logger.info('NODE_ENV, ' + process.env.NODE_ENV);
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use('/', routes);
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({ failure: err });
});

scheduler.start();

app.listen(app.get('port'), () => logger.info(`server is running on ${app.get('port')} port`));

export default app;
