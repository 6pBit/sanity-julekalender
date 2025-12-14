import { createFileRoute } from '@tanstack/react-router'
import { useRecipe } from '../../data/useRecipe'
import { PortableText } from '@portabletext/react'
import { Factbox } from '../../components/Factbox'
import { IngredientList } from '../../components/IngredientList'
import { urlFor } from '../../sanity/image'
import styles from './recipe.module.css'

export const Route = createFileRoute('/recipes/$recipeId')({
    component: RecipeComponent,
})

function RecipeComponent() {
    const { recipeId } = Route.useParams()
    const { data: recipe, isLoading, error } = useRecipe(recipeId)

    console.log('Recipe data:', recipe)

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading recipe</div>
    if (!recipe) return <div>Recipe not found</div>

    const components = {
        types: {
            factbox: Factbox,
            image: ({ value }: any) => (
                <div className={styles.contentImage}>
                    {value.asset && (
                        <img src={urlFor(value).width(800).url()} alt={value.alt || ''} />
                    )}
                </div>
            ),
            instructions: ({ value }: any) => (
                <div className={styles.instructionsBlock}>
                    <h2>Instruksjoner</h2>
                    <PortableText value={value.steps} />
                </div>
            )
        },
    }

    return (
        <div className={styles.container}>
            {recipe.mainImage && (
                <img
                    src={urlFor(recipe.mainImage).width(800).height(400).url()}
                    alt={recipe.title}
                    className={styles.mainImage}
                />
            )}
            <h1 className={styles.title}>{recipe.title}</h1>
            <p className={styles.description}>{recipe.description}</p>

            {recipe.ingredientList && (
                <IngredientList ingredients={recipe.ingredientList} />
            )}

            {recipe.body && (
                <div className={styles.content}>
                    <PortableText value={recipe.body} components={components} />
                </div>
            )}
        </div>
    )
}
