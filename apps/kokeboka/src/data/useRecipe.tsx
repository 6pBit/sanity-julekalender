import { client } from "@/sanity/client"
import RECIPE_QUERY from "./recipe"
import { useQuery } from "@tanstack/react-query"

export const useRecipe = (id: string) => {
    return useQuery({
        queryKey: ["recipe", id],
        queryFn: async () => client.fetch(RECIPE_QUERY, { id }),
    })
}
