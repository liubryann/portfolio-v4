import { useState } from 'react';
import styles from './favouritetech.module.scss';
import globalStyles from '../../../styles/styles.module.scss';
import Image from 'next/image';
import FadeInWhenVisible from '../../../lib/components/fade-in-visible';


export default function FavouriteTech() {
  const gridItems = [
    {
      label: "frontend frameworks",
      tech: [
        {
          name: "react",
          state: useState(false),
          comment: "This is my bread and butter. Awesome for quickly prototyping a frontend for small scale projects, but I'm experimenting with NextJS (this) for production builds."
        },
        {
          name: "vue",
          state: useState(false),
          comment: "I learned to really like Vue due to how structured and organized their components feel. I find that my large React components can sometimes become messy."
        },
        {
          name: "angular",
          state: useState(false),
          comment: "I wasn't gonna put this on here, but I can see the advantage it provides to enterprise applications through its architectural design patterns."
        }
      ],
    },
    {
      label: "other stuff",
      tech: [
        {
          name: "docker",
          state: useState(false),
          comment: "Does knowing the basic Docker commands mean I know Docker?"
        },
        {
          name: "redux",
          state: useState(false),
          comment: "Essential for managing state in large applications, as well as in combination with libraries like Redux Thunk for running side effects.",
        }
      ]
    },
    {
      label: "general purpose languages",
      tech: [
        {
          name: "typescript",
          state: useState(false),
          comment: "This should actually be JavaScript, but TypeScript is all the hype these days and it has certainly caught many type issues for me already."
        },
        {
          name: "python",
          state: useState(false),
          comment: "The best part about python is how easy it is pick up and providing access to powerful data manipulation libraries like pandas and numpy."
        }
      ]
    },
    {
      label: "still learning",
      tech: [
        {
          name: "lodash",
          state: useState(false),
          comment: "Sometimes a simple function like sum in JavaScript is unnecessarily complicated having to use reduce, but Lodash makes these things simple again."
        },
        {
          name: "graphql",
          state: useState(false),
          comment: "As someone who works a lot in the frontend, being able to query for the exact data in the shape I want is amazing so sign me up."
        },
        {
          name: "redux-saga",
          state: useState(false),
          comment: "A side effect library that I'm experimenting with. To be honest, I'm not sure what the advantage over Redux Thunk is yet."
        }
      ]
    },
    {
      label: "web frameworks",
      tech: [
        {
          name: "express",
          state: useState(false),
          comment: "If I'm using NodeJS for my backend for whatever reason, this is my go-to for creating API endpoints."
        },
        {
          name: "flask",
          state: useState(false),
          comment: "Super simple to use and I like python backends."
        }
      ],
    },
    {
      label: "\"interesting\"",
      tech: [
        {
          name: "haskell",
          state: useState(false),
          comment: "My first real introduction to functional programming that led me to often use functional features in other languages. Even though I'll probably never use it I still have to respect the OG. "
        },
        {
          name: "rails",
          state: useState(false),
          comment: "This one is interesting. I can see how it's useful for creating CRUD endpoints extremely fast with a single command, but it feels so different from other languages that I'm still on the edge."
        }
      ]
    }
  ]

  const gridComponents = gridItems.map((item) => {
    return (
      <div key={item.label}>
        <div className={globalStyles.subtitleStyle}>{item.label}</div>
        <div className={styles.techWrapper}>
          { item.tech.map((tech) => {
            return (
              <FadeInWhenVisible key={tech.name} hover>
                <div className={styles.techItemWrapper}>
                  { tech.state[0] && (
                    <div className={styles.comment}>
                      {tech.comment}
                    </div>
                  )}
                  <div className={styles.techItem} onMouseEnter={() => tech.state[1](true)} onMouseLeave={() => tech.state[1](false)}>
                    <div className={styles.imageWrapper}>
                      <Image
                        src={`/images/tech/${tech.name}.png`}
                        layout="fill"
                        objectFit="contain"
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

  return (
    <div className={styles.techPageWrapper}>
      { gridComponents }
    </div>
  )
}
