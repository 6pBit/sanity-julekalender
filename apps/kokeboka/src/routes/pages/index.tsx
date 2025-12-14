import { createFileRoute, Link } from '@tanstack/react-router'
import { client } from '../../sanity/client'
import styles from './index.module.css'

export const Route = createFileRoute('/pages/')({
    component: PagesIndex,
    loader: async () => {
        const query = `*[_type == "page"]{
      title,
      slug,
      "updatedAt": _updatedAt
    } | order(updatedAt desc)`
        const pages = await client.fetch(query)
        return { pages }
    },
})

function PagesIndex() {
    const { pages } = Route.useLoaderData()

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Blogginnlegg</h1>
            <div className={styles.grid}>
                {pages.map((page: any) => (
                    <Link
                        key={page.slug.current}
                        to="/pages/$slug"
                        params={{ slug: page.slug.current }}
                        className={styles.card}
                    >
                        <h2 className={styles.cardTitle}>{page.title}</h2>
                        <span className={styles.date}>
                            {new Date(page.updatedAt).toLocaleDateString('no-NO')}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    )
}
