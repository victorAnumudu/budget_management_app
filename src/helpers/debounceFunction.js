function debounceFunction(func, delay) {
  let timer;
  
  return function(...args) {
      // Clear the previous timer if the function is called before the delay
      clearTimeout(timer);

      // Set a new timer to execute the function after the specified delay
      timer = setTimeout(() => {
          func(...args);
      }, delay);
  };
}

  export default debounceFunction