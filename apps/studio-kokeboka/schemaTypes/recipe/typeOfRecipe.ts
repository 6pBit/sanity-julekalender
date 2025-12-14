import { defineField, defineType } from 'sanity'

export const typeOfRecipe = defineType({
    name: 'typeOfRecipe',
    title: 'Type of Recipe',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'value',
            title: 'Value',
            type: 'slug',
            options: {
                source: 'title',
            }
        })
    ],
})
