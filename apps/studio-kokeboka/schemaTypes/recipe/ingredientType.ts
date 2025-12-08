import { defineField, defineType } from 'sanity'
import { uniqueField } from '../../utils/uniqueField'

export const ingredientType = defineType({
    name: 'ingredientType',
    title: 'Ingredient Type',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.custom(uniqueField),
        }),
        defineField({
            name: 'parentSubCategory',
            title: 'Parent Sub Category',
            type: 'reference',
            to: [{ type: 'ingredientSubCategory' }],
        }),
        defineField({
            name: 'forms',
            title: 'Available Cuts/Forms',
            description: 'List the cuts or forms available for this type (e.g. "Thigh", "Breast").',
            type: 'array',
            of: [{ type: 'string' }],
        }),
    ],
})
