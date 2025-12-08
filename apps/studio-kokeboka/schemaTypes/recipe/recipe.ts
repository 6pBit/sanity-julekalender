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
            deprecated: {
                reason: 'Use the ingredientList field instead',
            },
            of: [{ type: 'ingredient' }],
            readOnly: true,
        }),
        defineField({
            name: 'ingredientList',
            title: 'Ingredients list',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'amount',
                            title: 'Amount',
                            type: 'string',
                        },
                        {
                            name: 'ingredient',
                            title: 'Ingredient',
                            type: 'reference',
                            to: [{ type: 'ingredient' }],
                        },
                    ],
                    preview: {
                        select: {
                            title: 'ingredient.name',
                            subtitle: 'amount',
                        },
                    },
                },
            ],
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
