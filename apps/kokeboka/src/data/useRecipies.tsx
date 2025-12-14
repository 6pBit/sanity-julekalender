import { client } from "@/sanity/client"
import RECIPES_QUERY from "./recipies"
import { useQuery } from "@tanstack/react-query"


export const useRecipies = (type?: string) => {
    return useQuery({
        queryKey: ["recipies", type],
        queryFn: async () => client.fetch(RECIPES_QUERY, { type: type ?? null }),
    })
}
