import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
    S.list()
        .title('Innhold')
        .items([
            // Group: Recipes by Type
            S.listItem()
                .title('Oppskrifter etter type')
                .child(
                    S.documentTypeList('typeOfRecipe')
                        .title('Typer')
                        .child((typeId) =>
                            S.documentList()
                                .title('Oppskrifter')
                                .filter('_type == "recipe" && typeOfRecipe._ref == $typeId')
                                .params({ typeId }),
                        ),
                ),
            // Direct access to all recipes
            S.documentTypeListItem('recipe').title('Alle oppskrifter'),

            S.divider(),

            // Everything else (excluding 'recipe')
            ...S.documentTypeListItems().filter(
                (listItem) => listItem.getId() !== 'recipe',
            ),
        ])
