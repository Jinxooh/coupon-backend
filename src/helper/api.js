import fetch from 'node-fetch';
import querystring from 'querystring';
import FormData from 'form-data';
import xmlPromiseParser from '../helper/xmlPromiseParser';
import logger from './logger';

const SERVER_URL = process.env.NODE_ENV === 'development' ? process.env.TEST_SERVER_URL : process.env.SERVER_URL;
// const SERVER_URL = process.env.TEST_SERVER_URL;
const callAPI = (endPoint, body) => new Promise(async (resolve, reject) => {
  if (!endPoint) {
    logger.error('callAPI requires you specify an endpoint.');
    reject();
  }
  try {
    const form = new FormData();
    const keys = Object.keys(body);
    keys.forEach((key) => {
      form.append(key, body[key]);
    });
    logger.info(`${SERVER_URL}${endPoint}`);
    const rsp = await fetch(`${SERVER_URL}${endPoint}`, {
      method: 'POST',
      body: form,
    });
    const text = await rsp.text();
    const xml = await xmlPromiseParser(text);
    const { response } = xml;
    resolve(response);
  } catch (e) {
    reject(e);
  }
});

const callGetAPI = (endPoint, body) => new Promise(async (resolve, reject) => {
  if (!endPoint) {
    logger.error('callAPI requires you specify an endpoint.');
    reject();
  }
  try {
    const qs = querystring.stringify(body);
    logger.info(`${SERVER_URL}${endPoint}?${qs}`);
    const rsp = await fetch(`${SERVER_URL}${endPoint}?${qs}`, {
      method: 'GET',
    });
    const text = await rsp.text();
    const xml = await xmlPromiseParser(text);
    const { response } = xml;
    resolve(response);
  } catch (e) {
    reject(e);
  }
});

export default {
  callAPI,
  callGetAPI,
};
