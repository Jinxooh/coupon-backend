import express from 'express';
import bodyParser from 'body-parser';
// routes
import saleList from './routes/saleList';
import sendMMS from './routes/sendMMS';

const app = express();
// const job = schedule.scheduleJob('*/10 * * * * *', () => console.log('schedule on'));

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use('/saleList', saleList);
app.use('/sendMMS', sendMMS);

app.listen(app.get('port'), () => console.log(`server is running on ${app.get('port')} port`));

export default app;
