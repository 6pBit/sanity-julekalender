
import { defineField, defineType } from 'sanity'

export const button = defineType({
    name: 'button',
    title: 'Button',
    type: 'object',
    fields: [
        defineField({
            name: 'text',
            title: 'Button Text',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'modal',
            title: 'Modal Link',
            type: 'object',
            fields: [
                defineField({
                    name: 'type',
                    title: 'Link Type',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Internal', value: 'internal' },
                            { title: 'External', value: 'external' },
                        ],
                        layout: 'radio',
                    },
                    initialValue: 'external',
                }),
                defineField({
                    name: 'internalLink',
                    title: 'Internal Link',
                    type: 'reference',
                    to: [{ type: 'page' }, { type: 'recipe' }], // Assuming linking to pages or recipes
                    hidden: ({ parent }) => parent?.type !== 'internal',
                }),
                defineField({
                    name: 'externalLink',
                    title: 'External Link',
                    type: 'url',
                    hidden: ({ parent }) => parent?.type !== 'external',
                }),
            ]
        }),
        defineField({
            name: 'variant',
            title: 'Variant',
            type: 'string',
            options: {
                list: [
                    { title: 'Primary', value: 'primary' },
                    { title: 'Secondary', value: 'secondary' },
                    { title: 'Outline', value: 'outline' },
                ],
            },
            initialValue: 'primary',
        }),
    ],
})
