import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2025-01-01' })

async function fixMissing() {
    await client.createOrReplace({
        _id: "ingredient-hvirl-k-for-risen",
        _type: "ingredient",
        name: "Hvirløk for risen",
        mainGroup: "vegetable",
        category: [{ _type: 'reference', _ref: 'ingredientCategory-vegetable' }]
    })
    console.log("Created missing ingredient")
}

fixMissing()
