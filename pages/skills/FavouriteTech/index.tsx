import { useState } from 'react';
import styles from './favouritetech.module.scss';
import globalStyles from '../../../styles/styles.module.scss';
import Image from 'next/image';
import FadeInWhenVisible from '../../../lib/components/fade-in-visible';
import useWindowSize from '../../../lib/hooks/window-size';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import images from '../../../public/images/tech/index';
import gridItems from './techItems';

export default function FavouriteTech() {
  const [activeHover, setActiveHover] = useState("");

  const gridComponents = gridItems.map((item) => {
    return (
      <div key={item.label}>
        <div className={globalStyles.subtitleStyle}>{item.label}</div>
        <div className={styles.techWrapper}>
          { item.tech.map((tech) => {
            return (
              <FadeInWhenVisible key={tech.name} hover>
                <div className={styles.techItemWrapper}>
                  { activeHover === tech.name && (
                    <div className={styles.comment}>
                      {tech.comment}
                    </div>
                  )}
                  <div className={styles.techItem} onMouseEnter={() => setActiveHover(tech.name)} onMouseLeave={() => setActiveHover("")}>
                    <div className={styles.imageWrapper}>
                      <Image
                        src={images[tech.name]}
                        alt={tech.name}
                        priority
                      />
                    </div>
                    <div className={globalStyles.annotationStyle}>{tech.name}</div>
                  </div>
                </div>
              </FadeInWhenVisible>
            )
          })}
        </div>
      </div>
    )
  })

  const isMobile = useWindowSize();

  return (
    <div>
      { isMobile && (
        <div className={`${globalStyles.infoStyle} ${styles.info}`}><BsFillInfoCircleFill /><span>tap for more info</span></div>
      )}
    <div className={styles.techPageWrapper}>
      { gridComponents }
    </div>
    </div>
  )
}
