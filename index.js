import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import schedule from 'node-schedule';
import fetch from 'node-fetch';

// routes
import routes from './routes';

dotenv.config();
const app = express();

console.log('NODE_ENV. ', process.env.NODE_ENV);
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use('/', routes);
app.use((err, req, res, next) => {
  // if (process.env.NODE_ENV === 'development') console.error(err.stack);
  res.status(500).json({ failure: err });
});

// const job = schedule.scheduleJob('30 1-23/12 * * * *', () => {
// const job = schedule.scheduleJob('*/10 * * * * *', () => {
//   console.log('scheduler on');
//   fetch(`${process.env.TEST_BACKEND_SERVER}saleList`, { method: 'GET' });
//   // job.cancel();
// });
app.listen(app.get('port'), () => console.log(`server is running on ${app.get('port')} port`));

export default app;
