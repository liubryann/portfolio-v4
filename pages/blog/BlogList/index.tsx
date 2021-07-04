import Link from 'next/link';
import Date from '../../../lib/components/Date';
import globalStyles from '../../../styles/styles.module.scss';
import styles from './bloglist.module.scss';

export default function BlogList({ allPostsData }) {
  return (
    <div className={styles.listWrapper}>
      <ul className={`${styles.list} ${globalStyles.contentPadding}`}>
        { allPostsData && allPostsData.map(({ id, date, title }) => (
        <li key={id} >
          <Link href={`/posts/${id}`}>
            <a className={`${globalStyles.subtitleStyle} ${styles.listItem}`}>
              {title}
            </a>
          </Link>
          <br />
          <small className={globalStyles.annotationStyle}>
            <Date dateString={date} />
          </small>
        </li>
        ))}
      </ul>
    </div>
  )
}
