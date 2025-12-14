
import Hero from './modules/Hero'
import TextModule from './modules/TextModule'
import ImageModule from './modules/ImageModule'
import RecipeCard from './modules/RecipeCard'
import Button from './modules/Button'

interface PageBuilderProps {
    modules: any[]
}

import styles from './PageBuilder.module.css'

export default function PageBuilder({ modules }: PageBuilderProps) {
    if (!modules) return null

    return (
        <div className={styles.container}>
            {modules.map((module) => {
                switch (module._type) {
                    case 'hero':
                        return <Hero key={module._key} {...module} />
                    case 'textModule':
                        return <TextModule key={module._key} {...module} />
                    case 'imageModule':
                        return <ImageModule key={module._key} {...module} />
                    case 'recipeCard':
                        return <RecipeCard key={module._key} {...module} />
                    case 'button':
                        return <Button key={module._key} {...module} />
                    default:
                        return null
                }
            })}
        </div>
    )
}
