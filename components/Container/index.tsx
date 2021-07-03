import { useState } from 'react';
import styles from './container.module.scss';
import Head from 'next/head';
import Header from '../Header';
import Menu from '../Menu';
import { AnimatePresence, motion } from 'framer-motion' 
import useWindowSize from '../../lib/hooks/window-size';

const siteTitle = 'Bryan Liu';

export default function Container({ children }) {
  const [open, setOpen] = useState(false);
  const isMobile = useWindowSize();

  return (
    <div className={styles.container}>
      <Head>
        <meta
          name="description"
          content="Bryan Liu's personal portfolio website"
        />
        <meta name="og:title" content={siteTitle} />
        <title>{siteTitle}</title>
        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=PT+Sans" />
      </Head>
      <Header open={open} setOpen={setOpen} />
      <AnimatePresence>
        <main className={styles.main} key="main">{children}</main> 
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
