
import { Link } from '@tanstack/react-router'
import { Home, BookOpen } from 'lucide-react'

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
          <Link
            to="/pages"
            className={styles.navLink}
            activeProps={{
              className: styles.activeNavLink
            }}
          >
            <BookOpen size={20} />
            <span>Blogg</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
