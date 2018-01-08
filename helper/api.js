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
        console.error('something broken... status => ', rsp.status);
      }
      return rsp.text();
    })
    .then(xml => xmlPromiseParser(xml))
    .catch(err => Promise.reject(new Error(err)))
    .then((result) => {
      console.log('ressult: ', result);
      const { response } = result;
      resolve(response);
    })
    .catch(err => reject(err));
});

//   {
//   if (!endPoint) {
//     console.error('callAPI requires you specify an endpoint.');
//     return;
//   }

//   const form = new FormData();
//   const keys = Object.keys(body);
//   keys.forEach((key) => {
//     form.append(key, body[key]);
//   });

//   const rsp = await fetch(`${SERVER_URL}${endPoint}`, {
//     method: 'POST',
//     body: form,
//   });
//   const xml = await rsp.text();
//   const { response } = await xmlPromiseParser(xml);
//   return response;
// };


export default {
  callAPI,
};
