import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const LoadingToRedirect = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect 

    count === 0 && navigate('/login')
    return () => clearInterval(interval)
  }, [count] );
  return <div className="pt-20"></div>;
};

export default LoadingToRedirect;
