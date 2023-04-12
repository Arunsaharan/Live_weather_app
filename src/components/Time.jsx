import React, { useEffect, useState } from "react";
import "./Time.css";

const Time = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const refreshDate = () => {
    setCurrentTime(new Date());
  };

  useEffect(() => {
    const interval = setInterval(refreshDate, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="clock-wrap">
      <span>{currentTime.toLocaleTimeString()}</span>
    </div>
  );
};

export default Time;
