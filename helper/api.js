import fetch from 'node-fetch';
import FormData from 'form-data';
import xmlPromiseParser from '../helper/xmlPromiseParser';

const SERVER_URL = process.env.NODE_ENV === 'development' ? process.env.TEST_SERVER_URL : process.env.SERVER_URL;

const callAPI = (endPoint, body) => new Promise((resolve, reject) => {
  if (!endPoint) {
    console.error('callAPI requires you specify an endpoint.');
    reject();
  }

  const form = new FormData();
  const keys = Object.keys(body);
  keys.forEach((key) => {
    form.append(key, body[key]);
  });

  fetch(`${SERVER_URL}${endPoint}`, {
    method: 'POST',
    body: form,
  })
    .then((rsp) => {
      if (rsp.status !== 200) {
        reject(rsp.status);
      }
      return rsp.text();
    })
    .then(xml => xmlPromiseParser(xml))
    .then((result) => {
      if (result === null) reject();
      const { response } = result;
      resolve(response);
    })
    .catch(err => reject(err));
});

export default {
  callAPI,
};
