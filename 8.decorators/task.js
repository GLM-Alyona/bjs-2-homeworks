// Задача № 1

function cachingDecoratorNew(func) {
  let cache = [];
  function wrapper(...rest) {
    let hash = rest.join(',');
    let existResult = cache.filter(cacheRecord => cacheRecord.hash === hash);
    if (existResult.length === 1) {
        console.log('Из кэша: ' + existResult[0].value);
        return 'Из кэша: ' + existResult[0].value;
    } 
    else {
      let value = func.call(this, ...rest);
      console.log('Вычисляем: ' + value);
      if (cache.length < 5) {   
        cache.push({hash, value});
      } 
      else {
        cache.unshift({hash, value});
        cache.pop();
      } 
      return 'Вычисляем: ' + value;
    }
  }
  return wrapper;
}


// Задача № 2

function debounceDecoratorNew(func, ms) {

  let timeout;
  let repeatCall = false;

  function wrapper(...rest) {

    if (!repeatCall) {
      func.apply(this, ...rest);
      repeatCall = true;
      return;
    }
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      repeatCall = false
      func.apply(this, ...rest)
    }, ms)
  }
  return wrapper;
}


//Задача № 3

function debounceDecorator2(debounceDecoratorNew) {
  let count = 0;
  function wrapper(...rest) {
    wrapper.history = count++;
    return debounceDecoratorNew.call(this, ...rest);
  }
  return wrapper;
}