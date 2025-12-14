import { ArrayOfObjectsInputProps, useFormValue, useClient } from 'sanity'
import { Card, Text, Stack, Badge, Flex } from '@sanity/ui'
import { useEffect } from 'react'

export function IngredientDifficultyInput(props: ArrayOfObjectsInputProps) {
    const { value } = props
    const count = value?.length || 0

    // Access the sanity client to perform patches
    const client = useClient({ apiVersion: '2024-01-01' })

    // key to find the document being edited
    const documentId = useFormValue(['_id']) as string
    // read the current value of the difficult field to avoid infinite loops/unnecessary patches
    const currentDifficulty = useFormValue(['difficulty']) as string

    let difficulty = 'Easy'
    let tone: 'positive' | 'caution' | 'critical' = 'positive'

    if (count > 5) {
        difficulty = 'Medium'
        tone = 'caution'
    }
    if (count > 10) {
        difficulty = 'Advanced'
        tone = 'critical'
    }

    // Side effect: Update the 'difficulty' field in the background
    useEffect(() => {
        // Only patch if the value is different and we have a valid document ID
        // checking against currentDifficulty prevents loops
        if (documentId && difficulty !== currentDifficulty) {
            console.log(`Patching difficulty: ${difficulty}`)
            // We use .set() to update the specific field
            client.patch(documentId).set({ difficulty: difficulty }).commit()
                .catch(err => {
                    console.error('Failed to update difficulty:', err)
                })
        }
    }, [difficulty, currentDifficulty, documentId, client])

    return (
        <Stack space={3}>
            {/* Render the "Connected" Visual Card */}
            <Card padding={3} radius={2} shadow={1} tone={tone} border>
                <Flex justify="space-between" align="center">
                    <Stack space={2}>
                        <Text size={1} weight="semibold">Recipe Difficulty</Text>
                        <Text size={2}>{difficulty}</Text>
                    </Stack>
                    <Badge tone={tone} size={3}>{count} Ingredients</Badge>
                </Flex>
            </Card>

            {/* Render the default array input list below it */}
            {props.renderDefault(props)}
        </Stack>
    )
}
