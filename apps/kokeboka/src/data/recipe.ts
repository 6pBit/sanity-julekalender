import { defineQuery } from "groq"

const RECIPE_QUERY = defineQuery(`*[_type == "recipe" && _id == $id][0]{
  ...,
  body,
  instructions
}`)

export default RECIPE_QUERY
