
import { BsChevronCompactDown } from 'react-icons/bs';
import styles from './footer.module.scss'; 
import Link from 'next/link';

interface FooterProps {
  downArrow?: boolean,
  label?: string, 
}

export default function Footer({ downArrow, label }: FooterProps) {
  return (
    <footer className={styles.footerWrapper}>
      <Link href='/projects' >
        <a className={styles.footerMiddle}>
          <div className={styles.footerLabelStyle}>{ label ? (label) : (<BsChevronCompactDown/>)}</div>
          <BsChevronCompactDown className={styles.footerMiddleIcon} />
        </a>
      </Link>
    </footer>
  )
}
