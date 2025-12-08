import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2025-01-01' })

async function check() {
    const ingredients = await client.fetch(`*[_type == "ingredient"]{_id, name}`)
    console.log(JSON.stringify(ingredients, null, 2))
}

check()
