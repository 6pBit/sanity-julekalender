import { CustomValidator } from 'sanity'

export const uniqueField: CustomValidator = async (value, context) => {
    const { document, getClient } = context
    const client = getClient({ apiVersion: '2025-01-01' })
    const id = document?._id.replace(/^drafts\./, '')
    const params = {
        draft: `drafts.${id}`,
        published: id,
        name: value,
        type: document?._type,
    }
    const query = `count(*[_type == $type && name == $name && !(_id in [$draft, $published])])`
    const result = await client.fetch(query, params)
    return result === 0 ? true : 'Value must be unique'
}
