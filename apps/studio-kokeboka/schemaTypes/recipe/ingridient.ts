import { defineField, defineType } from "sanity";

export default defineType({
    name: "ingridient",
    title: "Ingridient",
    type: "object",
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
        }),
    ],
});

