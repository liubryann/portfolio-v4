import styles from './hero.module.scss';
import globalStyles from '../../styles/styles.module.scss';
import Image from 'next/image';

const name = 'Bryan Liu';

export default function Hero() {
  return (
    <div className={styles.parentWrapper}>
      <div className={styles.heroWrapper}>
        <div>
          <div className="animate__animated animate__fadeIn">
          <h1 className={`${styles.heroStyle} ${styles.firstName}`}>
            BRYAN
            <span className={globalStyles.hideDesktop}>
              {' LIU'}
            </span>
          </h1>
          </div>
          <div className="animate__animated animate__fadeInLeft">
            <h3 className={`${globalStyles.subtitleStyle} `}>SDE @amazon</h3>
          </div>
          <div className={`animate__animated animate__fadeInLeft animate__delay-1s ${globalStyles.delay}`}>
            <h3 className={`${globalStyles.subtitleStyle} ${styles.secondSubtitle}`}>and front-end enthusiast</h3>
          </div>
        </div>
        <div className={`${globalStyles.hideMobile} ${styles.portraitWrapper} animate__animated animate__fadeIn `} >
          <h1 className={`${styles.heroStyle} ${styles.lastName}`}>LIU</h1>
            <Image
              src="/images/portrait2.jpg"
              className={`${styles.portrait} ${globalStyles.hideMobile}`}
              height={400}
              width={400}
              alt={name}
              priority
            />
        </div>
      </div>
    </div>
  )
}
