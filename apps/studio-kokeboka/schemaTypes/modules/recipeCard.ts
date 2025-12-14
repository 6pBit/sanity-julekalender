
import { defineField, defineType } from 'sanity'

export const recipeCard = defineType({
    name: 'recipeCard',
    title: 'Recipe Card',
    type: 'object',
    fields: [
        defineField({
            name: 'recipe',
            title: 'Recipe',
            type: 'reference',
            to: [{ type: 'recipe' }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'overrideTitle',
            title: 'Override Title',
            type: 'string',
            description: 'Leave empty to use the recipe title',
        }),
        defineField({
            name: 'overrideImage',
            title: 'Override Image',
            type: 'image',
            description: 'Leave empty to use the recipe image',
        }),
    ],
    preview: {
        select: {
            title: 'recipe.title',
            subtitle: 'overrideTitle',
            media: 'recipe.mainImage',
        },
        prepare(selection) {
            const { title, subtitle, media } = selection
            return {
                title: subtitle || title,
                subtitle: subtitle ? `Original: ${title}` : undefined,
                media: media,
            }
        },
    },
})
