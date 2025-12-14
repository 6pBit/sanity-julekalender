
import { PortableText } from '@portabletext/react'
import styles from './TextModule.module.css'

interface TextModuleProps {
    content: any
    alignment: 'left' | 'center' | 'right'
}

export default function TextModule({ content, alignment }: TextModuleProps) {
    return (
        <div className={`${styles.textModule} ${styles[alignment]}`}>
            <div className={styles.container}>
                <PortableText value={content} />
            </div>
        </div>
    )
}
