import styles from './hero.module.scss';
import globalStyles from '../../styles/styles.module.scss';
import Image from 'next/image';

const name = 'Bryan Liu';

export default function Hero() {
  return (
    <div className={styles.parentWrapper}>
      <div className={styles.heroWrapper}>
        <div>
          <h1 className={`${styles.heroStyle} ${styles.firstName}`}>
            BRYAN
            <span className={globalStyles.hideDesktop}>
              {' LIU'}
            </span>
          </h1>
          <div className="animate__animated animate__fadeInLeft">
            <h3 className={`${globalStyles.subtitleStyle} `}>4th year SWE @uoft</h3>
          </div>
          <div className={`animate__animated animate__fadeInLeft animate__delay-1s ${globalStyles.delay}`}>
            <h3 className={`${globalStyles.subtitleStyle} ${styles.secondSubtitle}`}>and front-end specialist</h3>
          </div>
        </div>
        <div className={`${globalStyles.hideMobile} ${styles.portraitWrapper}`} >
          <h1 className={`${styles.heroStyle} ${styles.lastName}`}>LIU</h1>
            <Image
              priority
              src="/images/portrait.jpg"
              className={`${styles.portrait} ${globalStyles.hideMobile}`}
              height={400}
              width={400}
              alt={name}
            />
        </div>
      </div>
    </div>
  )
}
