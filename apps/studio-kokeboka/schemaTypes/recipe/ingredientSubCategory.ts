import { defineField, defineType } from 'sanity'
import { uniqueField } from '../../utils/uniqueField'

export const ingredientSubCategory = defineType({
    name: 'ingredientSubCategory',
    title: 'Ingredient Sub Category',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.custom(uniqueField),
        }),
        defineField({
            name: 'parentCategory',
            title: 'Parent Category',
            type: 'reference',
            to: [{ type: 'ingredientCategory' }],
        }),
    ],
})
