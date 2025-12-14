
import { defineField, defineType } from 'sanity'

export const page = defineType({
    name: 'page',
    title: 'Page',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'modules',
            title: 'Page Modules',
            type: 'array',
            of: [
                { type: 'hero' },
                { type: 'textModule' },
                { type: 'imageModule' },
                { type: 'recipeCard' },
                { type: 'button' },
            ],
        }),
    ],
})
