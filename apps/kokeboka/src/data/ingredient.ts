import { defineQuery } from "groq"

const INGREDIENT_QUERY = defineQuery(`*[_type == "ingredient" && _id == $id][0]{
  name,
  subCategory->{_id, name},
  "recipes": *[_type == "recipe" && !(_id in path("drafts.**")) && references(^._id)]{ _id, title, slug },
  "relatedRecipes": *[_type == "recipe" && !(_id in path("drafts.**")) && (^.subCategory._ref in ingredientList[].ingredient->subCategory._ref) && !references(^._id)]{ _id, title, slug }
}`)

export default INGREDIENT_QUERY
