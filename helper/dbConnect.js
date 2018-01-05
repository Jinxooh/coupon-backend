import mysql from 'mysql';

// db config
import { dbconfig } from '../config/dbconfig';

let connection = mysql.createConnection(dbconfig);

const handleDisconnect = () => {
  console.log('handleDisconnect()');
  connection.destroy();
  connection = mysql.createConnection(dbconfig);
  connection.connect((err) => {
    if (err) {
      console.log(' Error when connecting to db  (DBERR001):', err);
      setTimeout(handleDisconnect, 1000);
    }
  });
};

connection.connect((err) => {
  if (err) {
    console.log('Connection is err: ', err);
    setTimeout(handleDisconnect, 1000);
  }
});

export default connection;
