import { defineField, defineType } from 'sanity'

export const recipe = defineType({
    name: 'recipe',
    title: 'Recipe',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'ingredients',
            title: 'Ingredients',
            type: 'array',
            of: [{ type: 'ingredient' }],
        }),
        defineField({
            name: 'instructions',
            title: 'Instructions',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [
                { type: 'block' },
                { type: 'factbox' }
            ],
        }),

    ],
})
