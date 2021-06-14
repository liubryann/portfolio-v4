import { useState, useEffect } from "react";
import throttle from 'lodash.throttle';

export default function useWindowSize() {
  const [isMobile, setIsMobile] = useState(false); 

  useEffect(() => {
    function handleResize() {
      window.innerWidth <= 748 ? setIsMobile(true) : setIsMobile(false);
    }
    const throttleHandleResize = throttle(handleResize, 200);
    setIsMobile(window.innerWidth <= 748)
    window.addEventListener('resize', throttleHandleResize);
    return () => window.removeEventListener('resize', throttleHandleResize);
  }, [])

  return isMobile;
}