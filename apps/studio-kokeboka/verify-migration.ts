import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2025-01-01' })

async function verify() {
    const recipe = await client.fetch(`*[_type == "recipe"][0]{title, ingredientList[]{amount, ingredient->{name}}}`)
    console.log(JSON.stringify(recipe, null, 2))
}

verify()
