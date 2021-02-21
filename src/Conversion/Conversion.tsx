import { get } from 'https'

const Conversion = (callback: (...args: any[]) => void, baseCur: string, targetCur: string, amount: string) => {
  var AP_KEY = '187c342ff3c5f3d02ed2';

  baseCur = encodeURIComponent(baseCur);
  targetCur = encodeURIComponent(targetCur);
  var query = baseCur + '_' + targetCur;

  var url = 'https://free.currconv.com/api/v7/convert?q=' + query + '&compact=ultra&apiKey=' + AP_KEY;

  get(url, res => {
    var body = '';

    res.on('data', data => {
      body += data;
    });
    
    res.on('end', () => {
      try {
        var jsonObj = JSON.parse(body);
        var val = jsonObj[query];
        
        if (val) {
          var total = (Math.round(val * parseFloat(amount) * 10000) / 10000).toString();
          var value = (Math.round(parseFloat(val) * 10000) / 10000).toString();

          if (total.includes('.') && value.includes('.')) {
            callback({amount: total, value: value});
          } else if (value.includes('.')) {
            callback({amount: total.concat('.0000'), value: value});
          } else {
            callback({amount: total, value: value.concat('.0000')});
          }
        } else {
          var err = new Error("Value not found for " + query);
          console.log(err);
        }
      } catch(e) {
        console.log("Parse error: ", e);
      }
    });
  });
}

export default Conversion;
