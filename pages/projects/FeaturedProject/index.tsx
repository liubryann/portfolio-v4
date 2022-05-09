import Image from 'next/image';
import styles from './featuredproject.module.scss';
import useWindowSize from '../../../lib/hooks/window-size';
import FadeInWhenVisible from '../../../lib/components/fade-in-visible';
import project from '../../../public/images/ddd.png';

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
              alt="current stock info"
              priority
            />
          </FadeInWhenVisible>
          <div className={styles.verticalSpace} />
          <FadeInWhenVisible>
            <Image
              src={`/images/project_mobile_2.png`}
              width={598}
              height={400}
              alt="historic price chart"
              priority
            />
          </FadeInWhenVisible>
          <div className={styles.verticalSpace} />
          <FadeInWhenVisible>
            <Image
              src={`/images/project_mobile_3.png`}
              width={598}
              height={340}
              alt="posts queried from stock forums and news articles"
            />
          </FadeInWhenVisible>
          <div className={styles.verticalSpace} />
          <FadeInWhenVisible>
          <Image
            src={`/images/project_mobile_4.png`}
            width={598}
            height={320}
            alt="sentiment analyis done from google nlp"
          />
          </FadeInWhenVisible>
          <div className={styles.verticalSpace} />
        </div>
      )
      : (
        <FadeInWhenVisible>
          <div className={`${styles.wrapper} `}>
            <div className={`${styles.imageWrapper} `}>
              <Image
                src={project}
                alt="Due Dilligence for Dummies"
                priority
              />
            </div>
          </div>
        </FadeInWhenVisible>
      )
    }
    </div>
  )
}
