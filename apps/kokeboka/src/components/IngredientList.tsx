import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import styles from './IngredientList.module.css'

interface IngredientItemProps {
    item: {
        amount?: string
        cutOrForm?: string
        ingredient?: {
            _id: string
            name: string
            category?: string
            subCategory?: string
            type?: string
        }
    }
}

function IngredientItem({ item }: IngredientItemProps) {
    const [expanded, setExpanded] = useState(false)
    const { amount, cutOrForm, ingredient } = item

    if (!ingredient) return null

    return (
        <li className={styles.item}>
            <div className={styles.header}>
                <span className={styles.amount}>
                    {amount} {cutOrForm}
                </span>
                <span className={styles.name}>{ingredient.name}</span>
                <button
                    className={styles.expandBtn}
                    onClick={() => setExpanded(!expanded)}
                    aria-label={expanded ? "Collapse" : "Expand"}
                >
                    {expanded ? '▲' : '▼'}
                </button>
            </div>
            {expanded && (
                <div className={styles.details}>
                    {ingredient.category && (
                        <div className={styles.detailRow}>
                            <strong>Category:</strong> {ingredient.category}
                        </div>
                    )}
                    {ingredient.subCategory && (
                        <div className={styles.detailRow}>
                            <strong>Subcategory:</strong> {ingredient.subCategory}
                        </div>
                    )}
                    {ingredient.type && (
                        <div className={styles.detailRow}>
                            <strong>Type:</strong> {ingredient.type}
                        </div>
                    )}

                    <Link
                        to={`/ingredients/${ingredient._id}`}
                        className={styles.linkButton}
                    >
                        Show all recipes with this ingredient
                    </Link>
                </div>
            )}
        </li>
    )
}

export function IngredientList({ ingredients }: { ingredients: any[] }) {
    if (!ingredients || ingredients.length === 0) return null

    return (
        <div className={styles.list}>
            <h3>Ingredienser</h3>
            <ul className={styles.ul}>
                {ingredients.map((item, index) => (
                    <IngredientItem
                        key={item.ingredient?._id || index}
                        item={item}
                    />
                ))}
            </ul>
        </div>
    )
}
