import { defineQuery } from "groq"

const RECIPES_QUERY = defineQuery(`*[_type == "recipe" && !(_id in path("drafts.**"))]`)

export default RECIPES_QUERY
