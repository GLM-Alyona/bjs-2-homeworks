// Задача № 1
function cachingDecoratorNew(func) {
  let cache = [];
  
  function wrapper(...args) {
      const hash = args.join(',');
      let idx = cache.findIndex((item)=> item.hash == hash); 
      if (idx !== -1 ) { 
          let result = cache[idx].result; 
          console.log("Из кэша: " + result);
          return "Из кэша: " + result;
      }
  
      let result = func(...args); 
      cache.push({         
        result:result,
        hash:hash
      }); 
      
      if (cache.length > 5) { 
        cache.shift() 
      }

      console.log("Вычисляем: " + result);
      return "Вычисляем: " + result;  
  }
  return wrapper;
}


// Задача № 2

function debounceDecoratorNew(func, ms) {
  let allImmediate;
  let flag = false;
  return function wrapper(...args) {
    if (!flag) {
      func.apply(this, args);
    }
  flag = true;
  clearTimeout(allImmediate);
    allImmediate = setTimeout(() => {
      func.apply(this, args);
    flag = false;
    }, ms);
  };
}


//Задача № 3

function debounceDecorator2(func, ms) {
  let allImmediate;
  let flag = false;
  wrapper.count = 0;
  function wrapper(...args) {
  wrapper.count ++;
    if (!flag) {
      func.apply(this, args);  
    }
  flag = true;
	clearTimeout(allImmediate);
    allImmediate = setTimeout(() => {
      func.apply(this, args);
	    flag = false;
    }, ms);  
  };
  return wrapper;  
}