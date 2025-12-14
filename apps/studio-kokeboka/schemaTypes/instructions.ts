import { defineType, defineField } from 'sanity'

export const instructions = defineType({
    name: 'instructions',
    title: 'Instructions',
    type: 'object',
    fields: [
        defineField({
            name: 'steps',
            title: 'Steps',
            type: 'array',
            of: [{ type: 'block' }]
        })
    ],
    preview: {
        select: {
            steps: 'steps',
        },
        prepare({ steps }) {
            return {
                title: 'Instructions',
                subtitle: `${steps?.length || 0} steps`
            }
        }
    }
})
