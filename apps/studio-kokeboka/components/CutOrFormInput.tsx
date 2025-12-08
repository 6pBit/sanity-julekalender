import { useCallback, useEffect, useState } from 'react'
import { StringInputProps, useClient, useFormValue, set, unset } from 'sanity'
import { Select, Stack, Text, Card, Spinner } from '@sanity/ui'

export function CutOrFormInput(props: StringInputProps) {
    const { value, onChange } = props
    const client = useClient({ apiVersion: '2025-01-01' })

    // Watch the 'type' field in the document
    // We expect 'type' to be a reference: { _ref: string, _type: 'reference' }
    const ingredientType = useFormValue(['type']) as { _ref?: string } | undefined

    const [loading, setLoading] = useState(false)
    const [forms, setForms] = useState<string[]>([])

    useEffect(() => {
        const typeRefId = ingredientType?._ref

        if (!typeRefId) {
            setForms([])
            return
        }

        setLoading(true)
        const query = `*[_id == $id][0].forms`

        client.fetch(query, { id: typeRefId })
            .then((result) => {
                if (Array.isArray(result)) {
                    setForms(result)
                } else {
                    setForms([])
                }
            })
            .catch((err) => {
                console.error('Failed to fetch forms', err)
                setForms([])
            })
            .finally(() => {
                setLoading(false)
            })

    }, [ingredientType?._ref, client])

    const handleChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        const nextValue = event.currentTarget.value
        onChange(nextValue ? set(nextValue) : unset())
    }, [onChange])

    // If no type is selected, or type has no forms, we could either:
    // 1. Disable the input
    // 2. Render a text input (fallback)
    // 3. Render a message "Select a type first"

    if (!ingredientType?._ref) {
        return (
            <Card padding={3} radius={2} tone="caution">
                <Text size={1}>Please select an Ingredient Type first.</Text>
            </Card>
        )
    }

    if (loading) {
        return (
            <Stack padding={3}>
                <Spinner size={1} />
            </Stack>
        )
    }

    // If the selected type has No specific forms defined, maybe allow free text? 
    // Or just show "No forms defined".
    // For this implementation, I will treat empty forms list as "Open text input" or "No specific cut needed"
    // OPTION: If forms is empty, let's allow standard text input so user isn't blocked.
    if (forms.length === 0) {
        return props.renderDefault(props)
    }

    return (
        <Stack space={2}>
            <Select
                value={value}
                onChange={handleChange}
                fontSize={2}
            >
                <option value="">Select a cut/form...</option>
                {forms.map(f => (
                    <option key={f} value={f}>{f}</option>
                ))}
            </Select>
        </Stack>
    )
}
