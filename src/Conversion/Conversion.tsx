import { request } from 'https';

const getRate = (base: string, target: string): Promise<number> => {
  return new Promise(async (resolve, reject) => {
    let q = base.toUpperCase() + '_' + target.toUpperCase();

    const options = {
      hostname: 'free.currconv.com',
      port: 443,
      path: '/api/v7/convert?q=' + q + '&compact=ultra&apiKey=187c342ff3c5f3d02ed2',
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

const Conversion = (callback: (...args: any[]) => void, baseCur: string, targetCur: string, amount: string) => {
  getRate(baseCur, targetCur)
  .then((data) => {
    var total = (Math.round(data * parseFloat(amount) * 10000) / 10000).toString();
    var value = (Math.round(parseFloat(data.toString()) * 10000) / 10000).toString();
    if (total.includes('.') && value.includes('.')) {
      callback({amount: total, value: value});
    } else if (value.includes('.')) {
      callback({amount: total.concat('.0000'), value: value});
    } else if (total.includes('.')) {
      callback({amount: total, value: value.concat('.0000')});
    } else {
      callback({amount: total.concat('.0000'), value: value.concat('.0000')});
    }
  })
  .catch((err) => {
    console.log(err);
  });
}

export default Conversion;
