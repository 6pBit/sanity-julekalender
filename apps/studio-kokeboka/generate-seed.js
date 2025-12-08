const fs = require('fs');

const rawData = [
    { name: "Kylling filet", group: "meat" },
    { name: "Brokkoli", group: "vegetable" },
    { name: "Ris", group: "grain" },
    { name: "Kyllinglår", group: "meat" },
    { name: "Soyasaus", group: "staple" },
    { name: "Ris-eddik", group: "staple" },
    { name: "Gul løk", group: "vegetable" },
    { name: "Hvitløk", group: "vegetable" },
    { name: "Laurbærblad", group: "spice" },
    { name: "Pepper", group: "spice" },
    { name: "Sukker", group: "staple" },
    { name: "Jasmin ris", group: "grain" },
    { name: "Vårløk", group: "vegetable" },
    { name: "Kokkos olje", group: "staple" },
    { name: "Hvirløk for risen", group: "vegetable" },
    { name: "Fish sauce", group: "staple" },
    { name: "Agurk", group: "vegetable" },
    { name: "Rødløk", group: "vegetable" },
    { name: "Ingefær", group: "vegetable" },
    { name: "Chili valgritt", group: "vegetable" }
];

const categories = [
    { id: 'meat', name: 'Meat' },
    { id: 'vegetable', name: 'Vegetable' },
    { id: 'grain', name: 'Grain' },
    { id: 'spice', name: 'Spice' },
    { id: 'staple', name: 'Staple' },
    { id: 'dairy', name: 'Dairy' },
    { id: 'other', name: 'Other' }
];

const ndjsonLines = [];

// Create Categories
categories.forEach(cat => {
    ndjsonLines.push(JSON.stringify({
        _id: `ingredientCategory-${cat.id}`,
        _type: 'ingredientCategory',
        name: cat.name
    }));
});

// Create Ingredients
rawData.forEach(item => {
    // Generate a deterministic ID for idempotency (simple slugification)
    const slug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const id = `ingredient-${slug}`;

    ndjsonLines.push(JSON.stringify({
        _id: id,
        _type: 'ingredient',
        name: item.name,
        mainGroup: item.group, // Matches the option value in schema (lowercase)
        category: [
            {
                _type: 'reference',
                _ref: `ingredientCategory-${item.group}`
            }
        ]
    }));
});

fs.writeFileSync('seed-data.ndjson', ndjsonLines.join('\n'));
console.log('Generated seed-data.ndjson');
