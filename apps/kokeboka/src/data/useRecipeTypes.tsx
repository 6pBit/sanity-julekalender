import { client } from "@/sanity/client"
import RECIPE_TYPES_QUERY from "./recipeTypes"
import { useQuery } from "@tanstack/react-query"

export const useRecipeTypes = () => {
    return useQuery({
        queryKey: ["recipeTypes"],
        queryFn: async () => client.fetch(RECIPE_TYPES_QUERY),
    })
}
