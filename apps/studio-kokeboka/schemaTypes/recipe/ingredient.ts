import { defineField, defineType } from 'sanity'

export const ingredient = defineType({
    name: 'ingredient',
    title: 'Ingredient',
    type: 'object',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'amount',
            title: 'Amount',
            type: 'string',
        }),
        defineField({
            name: 'unit',
            title: 'Unit',
            type: 'string',
        }),
    ],
})
