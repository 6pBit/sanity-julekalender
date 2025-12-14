
import styles from './Hero.module.css'

interface HeroProps {
    title?: string
    subtitle?: string
    image?: any
    link?: string
}

export default function Hero({ title, subtitle, image, link }: HeroProps) {
    return (
        <section className={styles.hero}>
            {image && (
                <div className={styles.imageWrapper}>
                    {/* Note: You might want to use a Sanity image builder here for optimization */}
                    <img src={image.asset.url} alt={image.alt || title} className={styles.image} />
                </div>
            )}
            <div className={styles.content}>
                {title && <h1 className={styles.title}>{title}</h1>}
                {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                {link && <a href={link} className={styles.button}>Read More</a>}
            </div>
        </section>
    )
}
