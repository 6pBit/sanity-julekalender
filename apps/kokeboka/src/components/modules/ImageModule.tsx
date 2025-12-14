
import styles from './ImageModule.module.css'

interface ImageModuleProps {
    image: any
    feature: boolean
}

export default function ImageModule({ image, feature }: ImageModuleProps) {
    if (!image) return null

    return (
        <div className={`${styles.imageModule} ${feature ? styles.feature : ''}`}>
            <figure>
                <img src={image.asset.url} alt={image.alt} className={styles.image} />
                {image.caption && <figcaption className={styles.caption}>{image.caption}</figcaption>}
            </figure>
        </div>
    )
}
