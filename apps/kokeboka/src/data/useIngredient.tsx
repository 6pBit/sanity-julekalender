import { client } from "@/sanity/client"
import INGREDIENT_QUERY from "./ingredient"
import { useQuery } from "@tanstack/react-query"

export const useIngredient = (id: string) => {
    return useQuery({
        queryKey: ["ingredient", id],
        queryFn: async () => client.fetch(INGREDIENT_QUERY, { id }),
    })
}
