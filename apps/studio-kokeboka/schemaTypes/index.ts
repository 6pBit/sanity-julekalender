import { recipe } from './recipe/recipe'
import { ingredient } from './recipe/ingredient'
import { ingredientCategory } from './recipe/ingredientCategory'
import { ingredientSubCategory } from './recipe/ingredientSubCategory'
import { ingredientType } from './recipe/ingredientType'
import { dietaryTag } from './recipe/dietaryTag'
import { allergen } from './recipe/allergen'
import { factbox } from './factbox'

export const schemaTypes = [
    recipe,
    ingredient,
    ingredientCategory,
    ingredientSubCategory,
    ingredientType,
    dietaryTag,
    allergen,
    factbox
]
