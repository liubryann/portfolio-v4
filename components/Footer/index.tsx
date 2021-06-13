
import { BsChevronCompactDown } from 'react-icons/bs';
import styles from './footer.module.scss'; 
import Link from 'next/link';
import globalStyles from '../../styles/styles.module.scss';

interface FooterProps {
  middleLabel?: string, 
  middleLink: string,
  rightLabel?: string,
  rightLink?: string
}

export default function Footer({ middleLabel, middleLink, rightLabel, rightLink }: FooterProps) {
  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.empty} />
      <Link href={`/${middleLink}`} >
        <a className={styles.footerMiddle}>
          {middleLabel && <div className={styles.footerLabelStyle}>{ middleLabel }</div> }
          <BsChevronCompactDown className={styles.footerMiddleIcon} />
        </a>
      </Link>
      { (rightLink && rightLabel) ? (
          <Link href={rightLink}>
            {rightLabel && <a className={globalStyles.navStyle}>{rightLabel}</a> }
          </Link>
        ) : <div className={styles.empty} />
      }
    </footer>
  )
}
