import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// routes
import saleList from './routes/saleList';
import sendMMS from './routes/sendMMS';

const app = express();
// const job = schedule.scheduleJob('*/10 * * * * *', () => console.log('schedule on'));

dotenv.config();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use('/saleList', saleList);
app.use('/sendMMS', sendMMS);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.listen(app.get('port'), () => console.log(`server is running on ${app.get('port')} port`));

export default app;
