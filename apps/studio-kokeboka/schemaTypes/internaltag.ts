import { defineField, defineType } from 'sanity'

export const internaltag = defineType({
    name: 'internaltag',
    title: 'Internal Tag',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
        }),
    ],
})
