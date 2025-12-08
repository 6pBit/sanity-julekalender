import { defineCliConfig, getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2025-01-01' })

async function migrate() {
    console.log('Fetching recipes...')
    const recipes = await client.fetch(`*[_type == "recipe" && defined(ingredients)]`)
    console.log(`Found ${recipes.length} recipes to migrate.`)

    const transaction = client.transaction()

    for (const recipe of recipes) {
        const newList = recipe.ingredients.map(ing => {
            // Regenerate the deterministic ID we used for seeding
            let slug = ing.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

            // Handle specific mappings
            if (ing.name.toLowerCase() === 'hvirløk for risen') {
                slug = 'hvitl-k' // Maps to ingredient-hvitl-k (Hvitløk)
            }

            const refId = `ingredient-${slug}`

            // Combine amount and unit into the single 'amount' string field
            let amountStr = ''
            if (ing.amount && ing.unit) {
                amountStr = `${ing.amount} ${ing.unit}`
            } else if (ing.amount) {
                amountStr = ing.amount
            } else if (ing.unit) {
                amountStr = ing.unit // fallback?
            }

            return {
                _key: ing._key || Math.random().toString(36).substring(7),
                _type: 'object',
                amount: amountStr,
                ingredient: { _type: 'reference', _ref: refId }
            }
        })

        transaction.patch(recipe._id, p =>
            p.set({ ingredientList: newList })
            // .unset(['ingredients']) // Optionally keep it for now to be safe, but user asked to migrate. Let's keep it but formatted.
        )
    }

    if (recipes.length > 0) {
        console.log('Committing transaction...')
        await transaction.commit()
        console.log('Migration complete!')
    } else {
        console.log('No recipes needed migration.')
    }
}

migrate().catch(err => {
    console.error('Migration failed:', err)
    process.exit(1)
})
