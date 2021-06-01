import styles from './header.module.scss';
import globalStyles from '../../styles/styles.module.scss';
import Link from 'next/link';

export default function Header() {
  return (
    <header className={styles.headerWrapper}>
      <div>
        icon
      </div>
      <ul className={`${styles.navWrapper} ${globalStyles.navStyle}`}>
        <li>
          <Link href="/projects">
            <a>projects</a>
          </Link>
        </li>
        <li>
          <Link href="/skills">
            <a>skills</a>
          </Link>
        </li>
        <li>
          <Link href="/career">
            <a>career</a>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <a>contact</a>
          </Link>
        </li>
      </ul>
    </header>
  )
}
