
import { BsChevronCompactDown } from 'react-icons/bs';
import styles from './footer.module.scss'; 
import Link from 'next/link';
import globalStyles from '../../styles/styles.module.scss';

interface FooterProps {
  leftLabel?: JSX.Element,
  middleLabel?: string, 
  middleLink?: string,
  rightLabel?: string,
  rightLink?: string
}

export default function Footer({ leftLabel, middleLabel, middleLink, rightLabel, rightLink }: FooterProps) {
  return (
    <footer className={styles.footerWrapper}>
      { leftLabel ? (
        { ...leftLabel }
      )
        : <div className={styles.empty} />
      }
      { middleLink && (
        <Link href={`/${middleLink}`} >
          <a className={styles.footerMiddle}>
            {middleLabel && <div className={styles.footerLabelStyle}>{ middleLabel }</div> }
            <BsChevronCompactDown size={25} className={styles.footerMiddleIcon} />
          </a>
        </Link>
      )}
     
      { (rightLink && rightLabel) ? (
          <Link href={rightLink}>
            {rightLabel && <a className={`${globalStyles.navStyle} ${styles.footerRight}`}>{rightLabel}</a> }
          </Link>
        ) : <div className={styles.empty} />
      }
    </footer>
  )
}
