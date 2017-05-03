import async from 'async';

export const times = (calledFunction, calledFunctionArgs, callTimes) => {
  if (callTimes <= 1) {
    if (callTimes < 1) {
      return null;
    }
    return calledFunction(calledFunctionArgs);
  }
  return times(calledFunction, calledFunction(calledFunctionArgs), callTimes - 1);
};


export const instances = (calledFunction, calledFunctionArgs, callInstances) => {
  const threads = new Array(callInstances);
  async.map(threads, () => calledFunction(calledFunctionArgs), (err, result) => {
    if (err) {
      return null;
    }
    return result;
  });
};
