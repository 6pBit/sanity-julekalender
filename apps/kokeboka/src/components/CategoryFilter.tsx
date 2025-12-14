import styles from './CategoryFilter.module.css';

interface CategoryFilterProps {
    categories: string[];
    selectedCategory?: string;
    onSelectCategory: (category: string | undefined) => void;
}

export function CategoryFilter({
    categories,
    selectedCategory,
    onSelectCategory,
}: CategoryFilterProps) {
    return (
        <div className={styles.filterContainer}>
            <button
                className={`${styles.filterButton} ${!selectedCategory ? styles.active : ''}`}
                onClick={() => onSelectCategory(undefined)}
            >
                All
            </button>
            {categories.map((category) => (
                <button
                    key={category}
                    className={`${styles.filterButton} ${selectedCategory === category ? styles.active : ''
                        }`}
                    onClick={() => onSelectCategory(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}
