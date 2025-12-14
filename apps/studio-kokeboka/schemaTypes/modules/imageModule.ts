
import { defineField, defineType } from 'sanity'

export const imageModule = defineType({
    name: 'imageModule',
    title: 'Image Module',
    type: 'object',
    fields: [
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                defineField({
                    name: 'alt',
                    title: 'Alt Text',
                    type: 'string',
                }),
                defineField({
                    name: 'caption',
                    title: 'Caption',
                    type: 'string',
                }),
            ],
        }),
        defineField({
            name: 'feature',
            title: 'Feature Image',
            description: 'Make this image full width or featured',
            type: 'boolean',
            initialValue: false,
        }),
    ],
})
