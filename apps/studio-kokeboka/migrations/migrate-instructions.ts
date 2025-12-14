import { getCliClient } from 'sanity/cli'

const client = getCliClient()

const migrate = async () => {
    // 1. Fetch all recipes that have the old 'instructions' field defined
    console.log('Fetching recipes...')
    const recipes = await client.fetch(`*[_type == "recipe" && defined(instructions)]`)

    console.log(`Found ${recipes.length} recipes to migrate`)

    for (const recipe of recipes) {
        console.log(`Migrating: ${recipe.title} (${recipe._id})`)

        const oldInstructions = recipe.instructions
        const existingBody = recipe.body || []

        // Create the new instructions block
        const newInstructionsBlock = {
            _type: 'instructions',
            _key: Math.random().toString(36).substring(7), // simple random key
            steps: oldInstructions
        }

        // Append to body.
        const newBody = [...existingBody, newInstructionsBlock]

        // Patch the document
        try {
            await client.patch(recipe._id)
                .set({ body: newBody })
                .unset(['instructions']) // Remove the old field
                .commit()
            console.log(`Successfully migrated ${recipe.title}`)
        } catch (err) {
            console.error(`Failed to migrate ${recipe.title}:`, err)
        }
    }
}

migrate()
