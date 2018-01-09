import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// routes
import routes from './routes';

dotenv.config();
const app = express();
// const job = schedule.scheduleJob('*/10 * * * * *', () => console.log('schedule on'));

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


app.listen(app.get('port'), () => console.log(`server is running on ${app.get('port')} port`));

export default app;
