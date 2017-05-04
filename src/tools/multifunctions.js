import async from 'async';

const makeSeries = (serializedFunction, seriesLengthLeft, result) => {
  if (seriesLengthLeft === 0) {
    return result;
  }
  return makeSeries(serializedFunction, seriesLengthLeft - 1, serializedFunction(result));
};

export const serial = (serializedFunction, seriesLength, args) => {
  if (!(serializedFunction instanceof Function)) {
    throw new Error('Multifunctions-Serial Error: ', 'First passed argument must be a function.');
  } else if (!Number.isInteger(seriesLength) || seriesLength < 0) {
    throw new Error('Multifunctions-Serial Error: ', 'Second passed argument must be an positive integer series length.');
  } else if (seriesLength === 0) {
    return null;
  }
  return makeSeries(serializedFunction, seriesLength - 1, serializedFunction(args));
};

export const parallel = (parallelizedFunction, threads, args) => {
  if (!(parallelizedFunction instanceof Function)) {
    throw new Error('Multifunctions-Parallel Error: ', 'First passed argument must be a function.');
  } else if (!Number.isInteger(threads) || threads < 0) {
    throw new Error('Multifunctions-Parallel Error: ', 'Second passed argument must be an positive integer threads number.');
  } else if (threads === 0) {
    return null;
  }
  const threadsArray = new Array(threads);
  return async.map(threadsArray, (thread, callback) => {
    try {
      const result = parallelizedFunction(args);
      return callback(null, result);
    } catch (e) {
      return callback(e);
    }
  }, (err, results) => {
    if (err) {
      throw new Error(err.name, err.message);
    }
    return results;
  });
};
