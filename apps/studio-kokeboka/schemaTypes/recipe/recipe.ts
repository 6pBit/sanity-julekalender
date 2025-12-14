import { defineField, defineType } from 'sanity'
import { IngredientDifficultyInput } from '../../components/IngredientDifficultyInput'

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
            name: 'internaltag',
            title: 'Internal Tags',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'internaltag' }] }],
        }),
        defineField({
            name: 'typeOfRecipe',
            title: 'Type of Recipe',
            type: 'reference',
            to: [{ type: 'typeOfRecipe' }]
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
            name: 'difficulty',
            title: 'Difficulty',
            type: 'string',
            readOnly: true,
            hidden: true, // We hide this field as the UI is handled by ingredientList
            initialValue: 'Easy',
        }),
        defineField({
            name: 'ingredientList',
            title: 'Ingredients list',
            type: 'array',
            components: {
                // We attach the custom component here for the "connected" look
                input: IngredientDifficultyInput
            },
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
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [
                { type: 'block' },
                { type: 'factbox' },
                { type: 'image' },
                { type: 'instructions' }
            ],
        }),

    ],
})
