import { defineQuery } from "groq"

const RECIPES_QUERY = defineQuery(`*[_type == "recipe" && !(_id in path("drafts.**")) && (!defined($type) || typeOfRecipe->title == $type)] | order(title asc)`)

export default RECIPES_QUERY
