import { defineField, defineType } from 'sanity'
import { uniqueField } from '../../utils/uniqueField'

export const allergen = defineType({
    name: 'allergen',
    title: 'Allergen',
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
