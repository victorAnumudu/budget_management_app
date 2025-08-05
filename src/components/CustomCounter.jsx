// import React, { useEffect, useState } from 'react';

// const CustomCounter = ({ targetNumber, timeInSeconds }) => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     if (targetNumber <= 0 || timeInSeconds <= 0) return; // Handle edge cases

//     const interval = Math.floor(timeInSeconds * 1000 / targetNumber); // Time interval for each count in milliseconds
//     const totalTime = timeInSeconds * 1000; // Total time for the entire count in milliseconds

//     let currentCount = 0;
//     const intervalId = setInterval(() => {
//       currentCount++;
//       setCount((prevCount) => prevCount + 1); // Update state using the previous state

//       if (currentCount >= targetNumber) {
//         clearInterval(intervalId); // Stop the counting when the target number is reached
//       }
//     }, interval);

//     // Cleanup the interval on component unmount
//     return () => clearInterval(intervalId);
//   }, [targetNumber, timeInSeconds]);

//   return <>{count}</>;
// };

// export default CustomCounter;


import React from 'react';
import CountUp from 'react-countup';

const CustomCounter = ({ targetNumber, timeInSeconds }) => {
  return <CountUp end={targetNumber} duration={timeInSeconds} />;
  // return targetNumber
};

export default CustomCounter;