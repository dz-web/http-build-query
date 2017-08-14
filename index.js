const esc = param =>
  encodeURIComponent(param).replace(/[!'()*]/g, escape).replace(/%20/g, '+');
const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);

const httpBuildQuery = (queryData, numericPrefix, argSeparator, tempKey) => {
  numericPrefix = numericPrefix || null;
  argSeparator = argSeparator || '&';
  tempKey = tempKey || null;

  const query = Object.keys(queryData).map(k => {
    let res;
    let key = k;

    if (tempKey) {
      key = `${tempKey}[${key}]`;
    }

    if (typeof queryData[k] === 'object') {
      res = httpBuildQuery(queryData[k], null, argSeparator, key);
    } else {
      if (numericPrefix) {
        key = isNumeric(key) ? `${numericPrefix}${+key}` : key;
      }
      res = `${esc(key)}=${esc(queryData[k])}`;
    }

    return res;
  });

  return query.join(argSeparator).replace(/[!'()*]/g, '');
};

module.exports = httpBuildQuery;