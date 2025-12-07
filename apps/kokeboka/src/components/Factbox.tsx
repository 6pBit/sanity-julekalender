import React from 'react'

interface FactboxProps {
    value: {
        title?: string
        text?: string
    }
}

import styles from './Factbox.module.css'

export function Factbox({ value }: FactboxProps) {
    if (!value) return null
    return (
        <div className={styles.factbox}>
            {value.title && <h3 className={styles.title}>{value.title}</h3>}
            {value.text && <p className={styles.text}>{value.text}</p>}
        </div>
    )
}
