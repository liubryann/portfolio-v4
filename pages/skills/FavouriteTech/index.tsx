import { useState } from 'react';
import styles from './favouritetech.module.scss';
import globalStyles from '../../../styles/styles.module.scss';
import Image from 'next/image';
import FadeInWhenVisible from '../../../lib/components/fade-in-visible';
import useWindowSize from '../../../lib/hooks/window-size';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import images from '../../../public/images/tech/index';

const gridItems = [
  {
    label: "frontend frameworks",
    tech: [
      {
        name: "react",
        comment: "This is my bread and butter. Awesome for quickly prototyping a frontend for small scale projects, but I'm experimenting with NextJS (this) for production builds."
      },
      {
        name: "vue",
        comment: "I learned to really like Vue due to how structured and organized their components feel. I find that my large React components can sometimes become messy."
      },
      {
        name: "angular",
        comment: "I wasn't gonna put this on here, but I can see the advantage it provides to enterprise applications through its architectural design patterns."
      }
    ],
  },
  {
    label: "other stuff",
    tech: [
      {
        name: "docker",
        comment: "Docker is great for automatically setting up people's development environment for a project."
      },
      {
        name: "redux",
        comment: "Essential for managing state in large applications, as well as in combination with libraries like Redux Thunk for running side effects.",
      },
      {
        name: "lodash",
        comment: "I primarily use debounce and throttle, but there's a huge library of methods that make unnecessarily complicated Javascript functions simple again."
      },
    ]
  },
  {
    label: "general purpose languages",
    tech: [
      {
        name: "typescript",
        comment: "Even though working in Javascript is a lot faster, I'm still trying to adopt Typescript because it's great for catching typed errors."
      },
      {
        name: "python",
        comment: "The best part about Python is how easy it is pick up and providing access to powerful data manipulation libraries like pandas and numpy."
      }
    ]
  },
  {
    label: "still learning",
    tech: [
      {
        name: "jest",
        comment: "Testing is important, and what better way to test React and Javascript than Jest."
      },
      {
        name: "webpack",
        comment: "I want to publish a module to the npm registry so I'll have to learn this eventually to minimize bundle size."
      },
      {
        name: "lighthouse",
        comment: "This looks like a good tool to measure a webpage's performance."
      }
    ]
  },
  {
    label: "web frameworks",
    tech: [
      {
        name: "express",
        comment: "If I'm using NodeJS for my backend for whatever reason, this is my go-to for creating API endpoints."
      },
      {
        name: "flask",
        comment: "Super simple to use and I like Python backends."
      }
    ],
  },
  {
    label: "\"interesting\"",
    tech: [
      {
        name: "haskell",
        comment: "My first real introduction to functional programming that led me to often use functional features in other languages. Even though I'll probably never use it I still have to respect the OG. "
      },
      {
        name: "rails",
        comment: "This one is interesting. I can see how it's useful for creating CRUD endpoints extremely fast with a single command, but it feels so different from other languages that I'm still on the edge."
      }
    ]
  }
]

export default function FavouriteTech() {
  const [activeHover, setActiveHover] = useState("");

  const gridComponents = gridItems.map((item) => {
    return (
      <div key={item.label}>
        <div className={globalStyles.subtitleStyle}>{item.label}</div>
        <div className={styles.techWrapper}>
          { item.tech.map((tech) => {
            return (
              <FadeInWhenVisible key={tech.name} hover>
                <div className={styles.techItemWrapper}>
                  { activeHover === tech.name && (
                    <div className={styles.comment}>
                      {tech.comment}
                    </div>
                  )}
                  <div className={styles.techItem} onMouseEnter={() => setActiveHover(tech.name)} onMouseLeave={() => setActiveHover("")}>
                    <div className={styles.imageWrapper}>
                      <Image
                        src={images[tech.name]}
                        alt={tech.name}
                        priority
                      />
                    </div>
                    <div className={globalStyles.annotationStyle}>{tech.name}</div>
                  </div>
                </div>
              </FadeInWhenVisible>
            )
          })}
        </div>
      </div>
    )
  })

  const isMobile = useWindowSize();

  return (
    <div>
      { isMobile && (
        <div className={`${globalStyles.infoStyle} ${styles.info}`}><BsFillInfoCircleFill /><span>tap for more info</span></div>
      )}
    <div className={styles.techPageWrapper}>
      { gridComponents }
    </div>
    </div>
  )
}
