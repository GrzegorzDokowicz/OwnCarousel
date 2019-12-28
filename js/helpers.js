function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
function throttle(callback, delay) {
  let canCall = true;
  return function(...args) {
    if (canCall) {
      callback.apply(null, args);
      canCall = false;
      setTimeout(function() {
        canCall = false;
      }, delay);
    }
  };
}
