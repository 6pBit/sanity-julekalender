
import { Link } from '@tanstack/react-router'
import styles from './Button.module.css'

interface ButtonProps {
  text: string
  modal?: {
    type: 'internal' | 'external'
    internalLink?: any
    externalLink?: string
  }
  variant: 'primary' | 'secondary' | 'outline'
}

export default function Button({ text, modal, variant = 'primary' }: ButtonProps) {
    let href = '#';
    let isInternal = false;

    if (modal?.type === 'external' && modal.externalLink) {
        href = modal.externalLink;
    } else if (modal?.type === 'internal' && modal.internalLink) {
        isInternal = true;
        // Basic routing logic - adjust based on your actual routes
        if (modal.internalLink._type === 'recipe') {
             href = `/recipes/${modal.internalLink._id}` // Or slug if you use slugs for recipes
        } else if (modal.internalLink._type === 'page') {
             href = `/pages/${modal.internalLink.slug.current}`
        }
    }

  const className = `${styles.button} ${styles[variant]}`

  if (isInternal) {
      return (
          <div className={styles.wrapper}>
            <Link to={href} className={className}>{text}</Link>
          </div>
      )
  }

  return (
    <div className={styles.wrapper}>
        <a href={href} className={className} target={modal?.type === 'external' ? '_blank' : undefined} rel={modal?.type === 'external' ? 'noopener noreferrer' : undefined}>
        {text}
        </a>
    </div>
  )
}
