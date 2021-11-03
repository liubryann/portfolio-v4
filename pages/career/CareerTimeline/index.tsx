import { useState } from 'react';
import styles from './careertimeline.module.scss';
import globalStyles from '../../../styles/styles.module.scss';
import FadeInWhenVisible from '../../../lib/components/fade-in-visible';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import useWindowSize from '../../../lib/hooks/window-size';

export default function CareerTimeline() {
  const careerInfo = [
    {
      company: "mcdonald's",
      title: "Crew Member",
      date: '2016',
      comment: 'Developed the ability to make a cheeseburger in under 10s.',
      first: true
    },
    {
      company: "lakeridge health",
      title: "IT Technichian High School Intern",
      date: "2018",
      comment: "Provided IT help desk support across 5 Durham Region hospitals as well as performing hardware and network deployments.",
    },
    {
      company: "uoft",
      title: "IT Help Desk Part-time",
      comment: "Provided general in-person IT support as well as maintaining labs.",
      date: "2019",
    },
    {
      company: "opentext",
      title: "Full Stack Software Developer Intern",
      comment: "Worked on the admin client for OpentText Media Management, creating a wysiwyg editor for clients to fully customize and preview email notifications.",
      date: "2020",
    },
    {
      company: "verto",
      title: "Full Stack Software Developer Intern",
      comment: "Rapidly developing new features for the vaccine scheduling and lab testing solutions.",
      date: "2021",
    }
  ]

  const isMobile = useWindowSize();
  const [careerActive, setCareerActive] = useState(-1);

  const careerInfoComponent = careerInfo.map((career, index) => {
    return (
      <div className={styles.career} key={career.company}>
        <div className={`${globalStyles.annotationStyle} ${styles.company}`}>{career.company}</div>
        <div className={styles.lineWrapper}>
          { !career?.first ? (
            <div className={styles.line} />
          )
          : (
            <div className={styles.fill} />
          )}
          
          <FadeInWhenVisible hover>
            <div className={styles.circle} onMouseOver={() => setCareerActive(index)} onMouseLeave={() => setCareerActive(-1)} >
              { careerActive === index && (
                <div className={styles.comment}>
                  <div className={`${globalStyles.annotationStyle} ${styles.title}`} >{ career.title }</div>
                  { career.comment }
                </div>
              )}
            </div>
          </FadeInWhenVisible>
          <div className={styles.line} />
        </div>
        <div className={`${globalStyles.annotationStyle} ${styles.date}`}>{career.date}</div>
      </div>
    )
  })

  return (
    <div className={styles.timelineWrapper}>
      <div className={styles.timeline}>
      { isMobile && (
        <div className={`${globalStyles.infoStyle} ${styles.info}`}><BsFillInfoCircleFill /><span>tap for more info</span></div>
      )}
        { careerInfoComponent }
        <div className={styles.line} />
        <div className={styles.arrow} />
      </div>
      { !isMobile && (
        <div className={`${globalStyles.infoStyle} ${styles.info}`}><BsFillInfoCircleFill /><span>hover for more info</span></div>
      )}
    </div>
  )
}
