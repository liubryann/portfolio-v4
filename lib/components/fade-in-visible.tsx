import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

interface FadeInWhenVisibleProps {
  hover?: Boolean, 
  children: any,
}

export default function FadeInWhenVisible({ hover, children }: FadeInWhenVisibleProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.7 }}
      variants={{
        visible: { opacity: 1 },
        hidden: { opacity: 0 }
      }}
      whileHover={ hover ? { scale: 1.1, transition: { duration: 0.2 } } : undefined }
      whileTap={ hover ? { scale: 1.1, transition: { duration: 0.2 } } : undefined }
    >
      {children}
    </motion.div>
  );
}