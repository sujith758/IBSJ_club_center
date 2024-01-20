import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

const CountUp = ({ start, end, delay, duration }) => {
  const [count, setCount] = useState(start);

  const countSpring = useSpring({
    number: count,
    from: { number: start },
    reset: true,
    config: { duration: duration || 1000 },
    onRest: () => {
      setCount(end);
    },
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCount(end);
    }, delay || 0);

    return () => clearTimeout(timeoutId);
  }, [end, delay]);

  return <animated.span>{countSpring.number.interpolate((val) => Math.floor(val))}</animated.span>;
};

export default CountUp;
