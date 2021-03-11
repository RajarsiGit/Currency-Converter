import { request } from 'https'


const getRate = (base: string, target: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    let q = base.toUpperCase() + target.toUpperCase();

    const options1 = {
      hostname: 'rocky-crag-10144.herokuapp.com',
      port: 443,
      path: '/https://www.freeforexapi.com/api/live?pairs=' + q,
      method: 'GET'
    }

    const options2 = {
      hostname: 'freeforexapi.com',
      port: 443,
      path: '/api/live?pairs=' + q,
      method: 'GET'
    }
  
    const req = request(options2, res => {
      res.on('data', d => {
        var jsonObj = JSON.parse(d);
        var val = jsonObj['rates'][q].rate.toString();
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
  getRate('USD', baseCur)
  .then((base) => {
    getRate('USD', targetCur)
    .then((target) => {
      var val = 1/parseFloat(base) * parseFloat(target);
      var total = (Math.round(val * parseFloat(amount) * 10000) / 10000).toString();
      var value = (Math.round(parseFloat(val.toString()) * 10000) / 10000).toString();
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
  })
  .catch((err) => {
    console.error(err);
  });
}

export default Conversion;
