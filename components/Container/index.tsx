import { useState } from 'react';
import styles from './container.module.scss';
import Head from 'next/head';
import Header from '../Header';
import Menu from '../Menu';
import { AnimatePresence, motion } from 'framer-motion' 
import useWindowSize from '../../lib/hooks/window-size';

const siteTitle = 'Bryan Liu';

interface ContainerProps {
  center?: boolean,
  children?: React.ReactNode
}

export default function Container({ center, children }: ContainerProps) {
  const [open, setOpen] = useState(false);
  const isMobile = useWindowSize();

  return (
    <div className={styles.container}>
      <Head>
        <meta
          name="description"
          content="Hi I'm Bryan, welcome to my personal website. I'm currently a 4th year student at UofT interning at Amazon as a Software Development Engineer."
        />
        <meta name="og:title" content={siteTitle} />
        <title>{siteTitle}</title>
        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=PT+Sans" />
      </Head>
      <Header open={open} setOpen={setOpen} />
      <AnimatePresence>
        <main className={`${styles.main} ${center ? styles.center : ''}`} key="main">{children}</main> 
        { open && isMobile && (
          <motion.div
            initial={{ opacity: 0, zIndex:0 }}
            animate={{ opacity: 1, zIndex: 1, }}
            exit={{ opacity: 0, zIndex: 0,  }}
            transition={{ ease: 'easeOut', duration: 0.3 }} 
          >
            <Menu key="menu"/>   
          </motion.div>
         )}
      </AnimatePresence>
    </div>
  )
}
