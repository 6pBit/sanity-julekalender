
import { Link } from '@tanstack/react-router'
import styles from './RecipeCard.module.css'

interface RecipeCardProps {
    recipe: {
        _id: string
        title: string
        image?: any
    }
    overrideTitle?: string
    overrideImage?: any
}

export default function RecipeCard({ recipe, overrideTitle, overrideImage }: RecipeCardProps) {
    if (!recipe) return null

    const title = overrideTitle || recipe.title
    const image = (overrideImage?.asset) ? overrideImage : recipe.image

    return (
        <div className={styles.wrapper}>
            <Link to="/recipes/$recipeId" params={{ recipeId: recipe._id }} className={styles.card}>
                <div className={styles.imageWrapper}>
                    {image && <img src={image.asset.url} alt={title} className={styles.image} />}
                </div>
                <div className={styles.content}>
                    <h3 className={styles.title}>{title}</h3>
                </div>
            </Link>
        </div>
    )
}
