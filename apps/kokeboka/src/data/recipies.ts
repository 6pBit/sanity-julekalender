import {defineQuery} from "groq"

const RECIPES_QUERY = defineQuery(`*[_type == "recipe"]`)

export default RECIPES_QUERY
