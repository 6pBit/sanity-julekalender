import { defineQuery } from "groq"

const RECIPE_TYPES_QUERY = defineQuery(`*[_type == "typeOfRecipe"] { _id, title }`)

export default RECIPE_TYPES_QUERY
