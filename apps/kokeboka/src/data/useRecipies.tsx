import { client } from "@/sanity/client"
import RECIPES_QUERY from "./recipies"
import { useQuery } from "@tanstack/react-query"


export const useRecipies = () => {
    return useQuery({
        queryKey: ["recipies"],
        queryFn: async () => client.fetch(RECIPES_QUERY),
    })
}
