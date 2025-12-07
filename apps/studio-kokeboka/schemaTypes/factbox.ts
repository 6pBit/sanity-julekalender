import { defineField, defineType } from 'sanity'

export const factbox = defineType({
    name: 'factbox',
    title: 'Factbox',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'text',
            title: 'Text',
            type: 'text',
        }),
    ],
})
