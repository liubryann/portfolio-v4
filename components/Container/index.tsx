import styles from './container.module.scss';
import Head from 'next/head';

const siteTitle = 'Bryan Liu';

export default function Container({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <meta
          name="description"
          content="Bryan Liu's personal portfolio website"
        />
        <meta name="og:title" content={siteTitle} />
        <title>{siteTitle}</title>
      </Head>
      <main>{children}</main>
    </div>
  )
}
