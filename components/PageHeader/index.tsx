import React from 'react'
import Head from 'next/head';
import globalStyles from '../../styles/styles.module.scss';
import styles from './pageheader.module.scss';

interface PageHeaderProps {
  pageTitle: string,
  title: string, 
  subtitleOne?: any, 
  subtitleTwo?: string,
}

export default function PageHeader({ pageTitle, title, subtitleOne, subtitleTwo }: PageHeaderProps) {
  return (
    <div className={styles.pageHeaderWrapper}>
      <Head>
        <title>{ pageTitle }</title>
      </Head>
      <div className="animate__animated animate__fadeIn ">
        <h1 className={`${globalStyles.headerStyle} ${styles.title}`}>
          { title }
        </h1>
        </div>
      { subtitleOne && (
        <div className="animate__animated animate__fadeInLeft">
          <h3 className={`${globalStyles.subtitleStyle} `}>{ subtitleOne }</h3>
        </div>
      )}
      { subtitleTwo && (
        <div className={`animate__animated animate__fadeInLeft animate__delay-1s ${globalStyles.delay}`}>
          <h3 className={`${globalStyles.subtitleStyle} ${styles.secondSubtitle}`}>{ subtitleTwo }</h3>
        </div>
      )}
    </div>
  )
}
