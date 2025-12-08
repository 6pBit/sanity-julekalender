import { defineField, defineType } from 'sanity'
import { uniqueField } from '../../utils/uniqueField'

export const dietaryTag = defineType({
    name: 'dietaryTag',
    title: 'Dietary Tag',
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
