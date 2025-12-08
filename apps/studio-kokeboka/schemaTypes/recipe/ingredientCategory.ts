import { defineField, defineType } from 'sanity'
import { uniqueField } from '../../utils/uniqueField'

export const ingredientCategory = defineType({
    name: 'ingredientCategory',
    title: 'Ingredient Category',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.custom(uniqueField),
        }),
    ],
})
