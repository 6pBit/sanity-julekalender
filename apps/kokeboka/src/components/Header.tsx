import { Link } from '@tanstack/react-router'
import { Home } from 'lucide-react'

import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          <Link to="/" className={styles.logoLink}>
            Kokeboka
          </Link>
        </h1>

        <nav className={styles.nav}>
          <Link
            to="/"
            className={styles.navLink}
            activeProps={{
              className: styles.activeNavLink
            }}
          >
            <Home size={20} />
            <span>Home</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
