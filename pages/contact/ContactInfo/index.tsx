import styles from './contactinfo.module.scss';
import Link from 'next/link';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import FadeInWhenVisible from '../../../lib/components/fade-in-visible';

export default function ContactInfo() {
  return (
      <div className={styles.contactInfoWrapper}>
        <div className={styles.contactWrapper}>
        <FadeInWhenVisible>
            <div className={styles.blurb}>
              Hey! It looks like you made it to the end of my website. Make sure to check out my <Link href="/blog"><a>blog</a></Link> before you go and feel free to contact me at any of these links!
            </div>
          </FadeInWhenVisible>
          <div className={styles.links}>
            <FadeInWhenVisible hover>
              <Link href="https://www.linkedin.com/in/bryanliu-2000/">
                <a>
                  <FaLinkedin size={30} />
                </a>
              </Link>
            </FadeInWhenVisible>
            <FadeInWhenVisible hover>
              <Link href="https://github.com/liubryann">
                <a>
                  <FaGithub size={30} />
                </a>
              </Link>
            </FadeInWhenVisible>
            <FadeInWhenVisible hover>
              <Link href="mailto:bryan.liu@utoronto.ca">
                <a>
                  <FaEnvelope size={30} />
                </a>
              </Link>
            </FadeInWhenVisible>
          </div>
        </div>
      </div>
  )
}
