import { useState, useEffect } from "react";
import throttle from 'lodash.throttle';

export default function useWindowSize() {
  const [isMobile, setIsMobile] = useState(false); 

  useEffect(() => {
    function handleResize() {
      return throttle(() => {
        window.innerWidth <= 748 ? setIsMobile(true) : setIsMobile(false);
      }, 200); 
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  return isMobile;
}