function shortenNumber(value, dp=1) {
  // Remove commas and parse to number
  const num = parseFloat(String(value).replace(/,/g, ''));

  if (isNaN(num)) return 'Invalid';

  // Define suffixes
  const suffixes = [
    { value: 1e12, suffix: 't' }, // Trillion
    { value: 1e9, suffix: 'b' }, // Billion
    { value: 1e6, suffix: 'm' }, // Million
    { value: 1e3, suffix: 'k' }  // Thousand
  ];

  for (const { value: threshold, suffix } of suffixes) {
    if (num >= threshold) {
      return (num / threshold).toFixed(dp).replace(/\.0$/, '') + suffix;
    }
  }

  // Less than 1000, return as-is
  return num.toString();
}

export default shortenNumber