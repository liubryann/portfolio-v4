import Image from 'next/image';
import styles from './featuredproject.module.scss';
import useWindowSize from '../../lib/hooks/window-size';
import FadeInWhenVisible from '../../lib/components/fade-in-visible';

export default function FeaturedProject() {
  const isMobile = useWindowSize();

  return (
    <div>
      { isMobile 
      ? (
        <div className={styles.mobileImageWrapper}>
          <div className={styles.verticalSpace} />
          <FadeInWhenVisible>
            <Image
              src={`/images/project_mobile_1.png`}
              width={598}
              height={200}
            />
          </FadeInWhenVisible>
          <div className={styles.verticalSpace} />
          <FadeInWhenVisible>
            <Image
              src={`/images/project_mobile_2.png`}
              width={598}
              height={400}
            />
          </FadeInWhenVisible>
          <div className={styles.verticalSpace} />
          <FadeInWhenVisible>
            <Image
              src={`/images/project_mobile_3.png`}
              width={598}
              height={340}
            />
          </FadeInWhenVisible>
          <div className={styles.verticalSpace} />
          <FadeInWhenVisible>
          <Image
            src={`/images/project_mobile_4.png`}
            width={598}
            height={320}
          />
          </FadeInWhenVisible>
          <div className={styles.verticalSpace} />
        </div>
      )
      : (
        <div className={`${styles.imageWrapper} `}>
          <Image
            src="/images/ddd.png"
            width={1200}
            height={600}
            layout="intrinsic"
            className="animate__animated animate__fadeInUp"
          />
        </div>
      )
    }
    </div>
  )
}
