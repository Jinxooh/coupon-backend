import fetch from 'node-fetch';
import querystring from 'querystring';
import FormData from 'form-data';
import xmlPromiseParser from '../helper/xmlPromiseParser';
import logger from './logger';

const SERVER_URL = process.env.NODE_ENV === 'development' ? process.env.TEST_SERVER_URL : process.env.SERVER_URL;

const callAPI = (endPoint, body) => new Promise((resolve, reject) => {
  if (!endPoint) {
    logger.error('callAPI requires you specify an endpoint.');
    reject();
  }

  const form = new FormData();
  const keys = Object.keys(body);
  keys.forEach((key) => {
    form.append(key, body[key]);
  });
  logger.info(`${SERVER_URL}${endPoint}`);
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

const callGetAPI = (endPoint, body) => new Promise((resolve, reject) => {
  if (!endPoint) {
    logger.error('callAPI requires you specify an endpoint.');
    reject();
  }

  const qs = querystring.stringify(body);
  logger.info(`${SERVER_URL}${endPoint}?${qs}`);
  fetch(`${SERVER_URL}${endPoint}?${qs}`, {
    method: 'GET',
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
  callGetAPI,
};
