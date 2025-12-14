
import { defineField, defineType } from 'sanity'

export const textModule = defineType({
    name: 'textModule',
    title: 'Text Module',
    type: 'object',
    fields: [
        defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'alignment',
            title: 'Alignment',
            type: 'string',
            options: {
                list: [
                    { title: 'Left', value: 'left' },
                    { title: 'Center', value: 'center' },
                    { title: 'Right', value: 'right' },
                ],
                layout: 'radio',
            },
            initialValue: 'left',
        }),
    ],
})
