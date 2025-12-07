import { createFileRoute, Link } from '@tanstack/react-router'

import { useRecipies } from '../data/useRecipies'
import { urlFor } from '../sanity/image'
import { Activity, Suspense } from 'react'

import styles from './index.module.css'

export const Route = createFileRoute('/')({ component: App })

function App() {

  const { data: recipes, isLoading } = useRecipies()

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.heading}>Hei, jeg heter Johannes og jeg liker å lage mat</h1>
        <Activity mode={isLoading ? 'hidden' : 'visible'}>
          <Suspense fallback={<div>Loading...</div>}>
            <ul className={styles.recipeList}>
              {recipes?.map((recipe: any) => (
                <li key={recipe._id} className={styles.recipeItem}>
                  <Link
                    to="/recipes/$recipeId"
                    params={{ recipeId: recipe._id }}
                    className={styles.recipeLink}
                  >
                    {recipe.mainImage && (
                      <img
                        src={urlFor(recipe.mainImage).width(300).height(300).url()}
                        alt={recipe.title}
                        className={styles.recipeImage}
                      />
                    )}
                    <span>{recipe.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Suspense>
        </Activity>
      </div>
    </>
  )
}
