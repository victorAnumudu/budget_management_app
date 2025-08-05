const formatNumber = (number = 0) => {
    // return new Intl.NumberFormat().format(number);
    // return number.toFixed(2);
    if(!number){
      return '0.00'
    }else{
      return number.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
  };
  
  export default formatNumber