import { request } from 'https';
import { db, addData } from '../Database/dbHandler';
import { apiKey } from './API_KEY.json';

const getRate = (base: string, target: string): Promise<number> => {
  return new Promise(async (resolve, reject) => {
    let q = base.toUpperCase() + '_' + target.toUpperCase();

    const options = {
      hostname: 'free.currconv.com',
      port: 443,
      path: '/api/v7/convert?q=' + q + '&compact=ultra&apiKey=' + apiKey,
      method: 'GET'
    }
  
    const req = request(options, res => {
      res.on('data', d => {
        var jsonObj = JSON.parse(d);
        var val = parseFloat(jsonObj[q]);
        resolve(val);
      });
    });
  
    req.on('error', (error: { message: any; }) => {
      reject(error.message);
    });
  
    req.end();
  });
}

const Conversion = (baseCur: string, targetCur: string, amount: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    getRate(baseCur, targetCur)
    .then((data) => {
      var total = (Math.round(data * parseFloat(amount) * 10000) / 10000).toString();
      if (total.includes('.')) {
        addData(db, {base: amount + ' ' + baseCur, target: total + ' ' + targetCur });
      } else {
        addData(db, {base: amount + ' ' + baseCur, target: total + '.0000 ' + targetCur });
      }
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
  });
}

export default Conversion;
