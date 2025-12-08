import { createFileRoute, Link } from '@tanstack/react-router'
import { useIngredient } from '../../data/useIngredient'
import styles from './ingredient.module.css'

export const Route = createFileRoute('/ingredients/$ingredientId')({
  component: IngredientComponent,
})

function IngredientComponent() {
  const { ingredientId } = Route.useParams()
  const { data: ingredient, isLoading, error } = useIngredient(ingredientId)

  if (isLoading) return <div className={styles.container}>Loading...</div>
  if (error) return <div className={styles.container}>Error loading ingredient</div>
  if (!ingredient) return <div className={styles.container}>Ingredient not found</div>

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{ingredient.name}</h1>
      {ingredient.subCategory && (
        <p className={styles.subtitle}>
          <strong>Subcategory:</strong> {ingredient.subCategory.name}
        </p>
      )}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Recipes with {ingredient.name}</h2>
        {ingredient.recipes?.length > 0 ? (
          <ul className={styles.grid}>
            {ingredient.recipes.map((recipe: any) => (
              <li key={recipe._id}>
                <Link to={`/recipes/${recipe._id}`} className={styles.card}>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{recipe.title}</h3>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.emptyState}>No recipes found using this ingredient.</p>
        )}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Other recipes in {ingredient.subCategory?.name || 'this category'}</h2>
        {ingredient.relatedRecipes?.length > 0 ? (
          <ul className={styles.grid}>
            {ingredient.relatedRecipes.map((recipe: any) => (
              <li key={recipe._id}>
                <Link to={`/recipes/${recipe._id}`} className={styles.card}>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{recipe.title}</h3>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.emptyState}>No related recipes found.</p>
        )}
      </section>
    </div>
  )
}
