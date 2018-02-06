import { parseString } from 'xml2js';

const xmlPromiseParser = (xml, option = false) => new Promise((resolve, reject) => {
  parseString(xml, { explicitArray: option }, (err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});

export default xmlPromiseParser;
