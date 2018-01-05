import crypto from 'crypto';

const encrypt = (password) => {
  const key = 'DVH8M8RKVK4Q7SD3GAUFRKXO5LCSI4J3';
  const cipher = crypto.createCipheriv('aes-256-ecb', key);
  let result = cipher.update(password, 'utf8', 'hex');
  result += cipher.final('base64');
  return result;
};

export default encrypt;
