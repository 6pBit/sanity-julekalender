import { defineField, defineType } from 'sanity'
import { CutOrFormInput } from '../../components/CutOrFormInput'

export const ingredient = defineType({
    name: 'ingredient',
    title: 'Ingredient',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'ingredientCategory' }],
        }),
        defineField({
            name: 'subCategory',
            title: 'Sub Category',
            type: 'reference',
            to: [{ type: 'ingredientSubCategory' }],
        }),
        defineField({
            name: 'type',
            title: 'Type',
            type: 'reference',
            to: [{ type: 'ingredientType' }],
        }),
        defineField({
            name: 'cutOrForm',
            title: 'Cut or Form',
            type: 'string',
            description: 'Select a form. (Note: Valid forms must be defined in the selected Ingredient Type document first).',
            components: {
                input: CutOrFormInput
            },
            validation: (Rule) => Rule.custom(async (value, context) => {
                const { document, getClient } = context
                // If no value or no type selected, rely on other rules or skip
                if (!value || !document?.type) return true

                const client = getClient({ apiVersion: '2025-01-01' })

                // Fetch the forms list from the referenced type document
                // document.type is a reference object { _ref: '...', _type: 'reference' }
                const typeRefId = (document.type as any)._ref

                if (!typeRefId) return true

                const result = await client.fetch(
                    `*[_id == $id][0].forms`,
                    { id: typeRefId }
                )

                // If the type has no forms defined, allow anything (or restrict? assume allow for flexibility)
                if (!result || !Array.isArray(result) || result.length === 0) return true

                return result.includes(value) ? true : `Must be one of: ${result.join(', ')}`
            })
        }),
        defineField({
            name: 'dietaryTags',
            title: 'Dietary Tags',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'dietaryTag' }] }],
        }),
        defineField({
            name: 'allergens',
            title: 'Allergens',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'allergen' }] }],
        }),
        defineField({
            name: 'amount',
            title: 'Amount',
            type: 'string',
            deprecated: {
                reason: 'shouldnt hold this information',
            },
        }),
        defineField({
            name: 'unit',
            title: 'Unit',
            type: 'string',
            deprecated: {
                reason: 'shouldnt hold this information',
            },
        }),
    ],
})
