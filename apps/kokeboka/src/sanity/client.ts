import { createClient } from "@sanity/client";

export const client = createClient({
    projectId: "aybuwal9",
    dataset: "production",
    apiVersion: "2023-05-01",
    useCdn: true,
    withCredentials: true,
});
