import styles from './header.module.scss';
import globalStyles from '../../styles/styles.module.scss';
import Link from 'next/link';
import Hamburger from '../Hamburger';

export default function Header({ open, setOpen }) {
  const links = [
    'blog',
    'projects',
    'skills',
    'career',
    'contact'
  ]

  return (
    <div>
    <header className={styles.headerWrapper}>
      <div>
        icon
      </div>
      <ul className={`${styles.navWrapper} ${globalStyles.navStyle} ${globalStyles.hideMobile}`}>
        { links.map((link, index) => {
            return (
              <li key={index}>
                <Link href={`/${link}`}>
                  <a>{link}</a>
                </Link>
              </li>
            )}) 
          }
      </ul>
      <div className={`${styles.hamburgerWrapper} ${globalStyles.hideDesktop}`}>
        <Hamburger open={open} setOpen={setOpen} />
      </div>
    </header>
    </div>
  )
}
