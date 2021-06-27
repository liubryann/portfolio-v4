import { useState } from 'react';
import styles from './careertimeline.module.scss';
import globalStyles from '../../../styles/styles.module.scss';
import FadeInWhenVisible from '../../../lib/components/fade-in-visible';
import { BsFillInfoCircleFill } from 'react-icons/bs';

export default function CareerTimeline() {
  const careerInfo = [
    {
      company: "mcdonald's",
      title: "Crew Member",
      date: '2016',
      comment: 'Developed the ability to make a cheeseburger in under 10s.',
      state: useState(false),
      first: true
    },
    {
      company: "lakeridge health",
      title: "IT Technichian High School Intern",
      date: "2018",
      comment: "Provided IT help desk support across 5 Durham Region hospitals as well as performing hardware and network deployments.",
      state: useState(false),
    },
    {
      company: "uoft",
      title: "IT Help Desk Part-time",
      comment: "Provided general in-person IT support as well as maintaining labs.",
      date: "2019",
      state: useState(false),
    },
    {
      company: "opentext",
      title: "Full Stack Software Developer Intern",
      comment: "Worked on the admin client for OpentText Media Management, creating a wysiwyg editor for clients to fully customize and preview email notifications.",
      date: "2020",
      state: useState(false),
    },
    {
      company: "verto",
      title: "Full Stack Software Developer Intern",
      comment: "Rapidly developing new features for the vaccine scheduling and lab testing solutions.",
      date: "2021",
      state: useState(false),
    }
  ]

  const careerInfoComponent = careerInfo.map((career) => {
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
            <div className={styles.circle} onMouseOver={() => career.state[1](true)} onMouseLeave={() => career.state[1](false)} >
              { career.state[0] && (
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
        { careerInfoComponent }
        <div className={styles.line} />
        <div className={styles.arrow} />
      </div>
      <div className={styles.info}><BsFillInfoCircleFill /><span>hover for more info</span></div>
    </div>
  )
}
