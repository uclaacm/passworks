import React from 'react';
import { useCountUp } from 'react-countup';

export default function GuesserAndTimer(props) {
  const { countUp: countUp1, start: start1 } = useCountUp({
    start: 0,
    end: 100,
    delay: 1000,
    duration: 5
  });
  const { countUp: countUp2, start: start2 } = useCountUp({
    start: 0,
    end: 100,
    delay: 1000,
    duration: 5
  });
  const start = () => {
    start1();
    start2();
  }
  return (
    <div>
      <div>{countUp1}</div>
      <div>{countUp2}</div>
      <button onClick={() => start()}>Start</button>
    </div>
  );
};
