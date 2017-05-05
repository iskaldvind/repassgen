import async from 'async';

const asyncMapCallback = (err, results) => {
  if (err) {
    throw new Error(err.name, err.message);
  }
  return results;
};

const multithread = (items, func, ...args) => {
  async.map(items, (_, callback) => {
    try {
      const result = func(...args, _);
      return callback(null, result);
    } catch (err) {
      return callback(err);
    }
  }, asyncMapCallback);
};

export default multithread;
