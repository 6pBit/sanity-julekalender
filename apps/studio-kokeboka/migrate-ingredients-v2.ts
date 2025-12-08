import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2025-01-01' })

// Taxonomy Definitions
const subCategories = [
    { _id: 'sub-poultry', name: 'Poultry', parent: 'ingredientCategory-meat' },
    { _id: 'sub-vegetable', name: 'Vegetable', parent: 'ingredientCategory-vegetable' }, // Generic vegetable sub
    { _id: 'sub-grain', name: 'Grain', parent: 'ingredientCategory-grain' },
    { _id: 'sub-condiment', name: 'Condiment', parent: 'ingredientCategory-staple' },
    { _id: 'sub-spice', name: 'Spice/Herb', parent: 'ingredientCategory-spice' },
    { _id: 'sub-sweetener', name: 'Sweetener', parent: 'ingredientCategory-staple' },
    { _id: 'sub-fat', name: 'Fat/Oil', parent: 'ingredientCategory-staple' },
]

const types = [
    { _id: 'type-chicken', name: 'Chicken', parent: 'sub-poultry', forms: ['Filet', 'Thigh', 'Whole', 'Wing', 'Drumstick', 'Ground'] },
    { _id: 'type-broccoli', name: 'Broccoli', parent: 'sub-vegetable' },
    { _id: 'type-rice', name: 'Rice', parent: 'sub-grain' },
    { _id: 'type-soy-sauce', name: 'Soy Sauce', parent: 'sub-condiment' },
    { _id: 'type-rice-vinegar', name: 'Rice Vinegar', parent: 'sub-condiment' },
    { _id: 'type-onion', name: 'Onion', parent: 'sub-vegetable', forms: ['Yellow', 'Red', 'White', 'Chopped', 'Sliced'] },
    { _id: 'type-garlic', name: 'Garlic', parent: 'sub-vegetable', forms: ['Clove', 'Bulb', 'Minced'] },
    { _id: 'type-bay-leaf', name: 'Bay Leaf', parent: 'sub-spice' },
    { _id: 'type-pepper', name: 'Pepper', parent: 'sub-spice' },
    { _id: 'type-sugar', name: 'Sugar', parent: 'sub-sweetener' },
    { _id: 'type-scallion', name: 'Scallion', parent: 'sub-vegetable' },
    { _id: 'type-coconut-oil', name: 'Coconut Oil', parent: 'sub-fat' },
    { _id: 'type-fish-sauce', name: 'Fish Sauce', parent: 'sub-condiment' },
    { _id: 'type-cucumber', name: 'Cucumber', parent: 'sub-vegetable' },
    { _id: 'type-ginger', name: 'Ginger', parent: 'sub-vegetable' },
    { _id: 'type-chili', name: 'Chili', parent: 'sub-vegetable' },
]

// Map mapping Ingredient Name (lowercase) -> { typeId, form?, subId? (if optional override) }
const ingredientMap: Record<string, { typeId: string, form?: string }> = {
    'kylling filet': { typeId: 'type-chicken', form: 'Filet' },
    'kyllinglår': { typeId: 'type-chicken', form: 'Thigh' },
    'brokkoli': { typeId: 'type-broccoli' },
    'ris': { typeId: 'type-rice' },
    'jasmin ris': { typeId: 'type-rice', form: 'Jasmine' }, // Ad-hoc form
    'soyasaus': { typeId: 'type-soy-sauce' },
    'ris-eddik': { typeId: 'type-rice-vinegar' },
    'gul løk': { typeId: 'type-onion', form: 'Yellow' },
    'hvitløk': { typeId: 'type-garlic' },
    'laurbærblad': { typeId: 'type-bay-leaf' },
    'pepper': { typeId: 'type-pepper' },
    'sukker': { typeId: 'type-sugar' },
    'vårløk': { typeId: 'type-scallion' },
    'kokkos olje': { typeId: 'type-coconut-oil' },
    'hvirløk for risen': { typeId: 'type-garlic', form: 'For Rice' },
    'fish sauce': { typeId: 'type-fish-sauce' },
    'agurk': { typeId: 'type-cucumber' },
    'rødløk': { typeId: 'type-onion', form: 'Red' },
    'ingefær': { typeId: 'type-ginger' },
    'chili valgritt': { typeId: 'type-chili' },
    'rød chili': { typeId: 'type-chili', form: 'Red' },
}

async function run() {
    const transaction = client.transaction()

    // 1. Create SubCategories
    for (const sub of subCategories) {
        transaction.createOrReplace({
            _id: sub._id,
            _type: 'ingredientSubCategory',
            name: sub.name,
            parentCategory: { _type: 'reference', _ref: sub.parent }
        })
    }

    // 2. Create Types
    for (const t of types) {
        transaction.createOrReplace({
            _id: t._id,
            _type: 'ingredientType',
            name: t.name,
            parentSubCategory: { _type: 'reference', _ref: t.parent },
            forms: t.forms || []
        })
    }

    // 3. Migrate Ingredients
    const ingredients = await client.fetch(`*[_type == "ingredient"]`)
    console.log(`Migrating ${ingredients.length} ingredients...`)

    for (const ing of ingredients) {
        const lowerName = ing.name.toLowerCase()
        const mapping = ingredientMap[lowerName]

        const patch = client.patch(ing._id)

        // A. Migrate Category (Array -> Single)
        if (Array.isArray(ing.category) && ing.category.length > 0) {
            patch.set({ category: ing.category[0] }) // Take first ref
        } else if (!ing.category) {
            // Try to recover from mainGroup if exists
            if (ing.mainGroup) {
                patch.set({ category: { _type: 'reference', _ref: `ingredientCategory-${ing.mainGroup}` } })
            }
        }

        // B. Apply Type, SubCategory, Form
        if (mapping) {
            // Find type def to get parent sub
            const typeDef = types.find(t => t._id === mapping.typeId)

            if (typeDef) {
                patch.set({
                    type: { _type: 'reference', _ref: mapping.typeId },
                    subCategory: { _type: 'reference', _ref: typeDef.parent }
                })
            }

            if (mapping.form) {
                patch.set({ cutOrForm: mapping.form })
            }
        }

        // C. Cleanup old fields
        patch.unset(['mainGroup', 'isA', 'parentIngredient'])

        transaction.patch(patch)
    }

    console.log('Committing transaction...')
    await transaction.commit()
    console.log('Migration done!')
}

run().catch(err => {
    console.error(err)
    process.exit(1)
})
