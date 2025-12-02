import { defineField, defineType } from "sanity";

export default defineType({
    name: "recipe",
    title: "Recipe",
    type: "object",
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
        }),
        defineField({
            name: "ingridients",
            title: "Ingridients",
            type: "array",
            of: [{ type: "ingridient" }],
        }),
        defineField({
            name: "instructions",
            title: "Instructions",
            type: "array",
            of: [{ type: "block" }],
        }),
        defineField({
            name: "image",
            title: "Image",
            type: "image",
        }),
    ],
}); 