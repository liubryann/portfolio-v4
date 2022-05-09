import styles from './header.module.scss';
import globalStyles from '../../styles/styles.module.scss';
import Link from 'next/link';
import Hamburger from '../Hamburger';
import { useState } from 'react';

/** Header navigation or hamburger in mobile */
export default function Header({ open, setOpen }) {
  const links = [
    'blog',
    'projects',
    'skills',
    'career',
    'contact'
  ]

  const [logo, setLogo] = useState("/images/apollo_mad_dark.png");

  return (
    <div>
    <header className={styles.headerWrapper}>
      <div>
        <Link href="/">
          <a 
            onMouseEnter={() => setLogo("/images/apollo_happy_dark.png")} 
            onMouseLeave={() => setLogo("/images/apollo_mad_dark.png")}
          >
            <img src={logo} className={styles.apollo} alt="apollo" />
          </a>
        </Link>
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
