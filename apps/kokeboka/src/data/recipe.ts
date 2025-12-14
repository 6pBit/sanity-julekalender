import { defineQuery } from "groq"

const RECIPE_QUERY = defineQuery(`*[_type == "recipe" && _id == $id][0]{
  ...,
  body[]{
    ...,
    _type == "image" => {
        ...,
        asset->
    },
    _type == "instructions" => {
        ...,
        steps
    },
    _type == "factbox" => {
        ...
    }
  },
  ingredientList[]{
    amount,
    cutOrForm,
    ingredient->{
      _id,
      name,
      "category": category->name,
      "subCategory": subCategory->name,
      "type": type->name
    }
  }
}`)

export default RECIPE_QUERY
