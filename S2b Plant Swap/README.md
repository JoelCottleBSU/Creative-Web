# Plant Swap Shelf

## Run it

Use two terminals. Start Express first.

1. **Express API (port 3001):** in `express-api`, run `npm install`, copy `.env.example` to `.env` and add `MONGODB_URI` and `PORT=3001`, then run `npm run dev`.
2. **SvelteKit app (port 5173):** in `sveltekit-app`, run `npm install`, copy `.env.example` to `.env` and add `PLANTS_API_URL=http://localhost:3001`, then run `npm run dev`.
3. Open http://localhost:5173/shelf

## Answers

1. In my env file I give the name of the database within the MONGODB_URI, which is PlantJoel. Then in the Express API, the models/Plants.js file holds the schema for plants, and my collection in the PlantJoel database (plants) comes from mongoose.model("Plants", PlantsSchema). My Express app is then connected to the database in index.js through mongoose.connect(process.env.MONGODB_URI).
2. When the user clicks the Low link, the browser opens /shelf?light=low. load() in shelf/+page.server.js reads light from the URL, which gives “low”, and calls fetchPlants(light) in SvelteKit’s plantsApi.js, which sends a request to Express at /api/plants?light=low. In Express, the GET /api/plants route in index.js reads req.query.light, checks it and calls getAll(light) in plantData.js, which runs Plants.find({ lightNeeds: "low" }). MongoDB sends back the low-light plants, index.js sends them to SvelteKit as JSON with res.json(plants), load() returns { plants, light }, and the page shows each plant in its own card.
3. In the database MongoDB creates the id itself as _id: ObjectId('6afd8eaf1fa4c849363e7c82'), Express sends it in the JSON as plain text in both _id and id, and in the URL it is the same text, e.g. /shelf/6afd8eaf1fa4c849363e7c82. Express makes the id the page uses in models/Plants.js with toJSON: { virtuals: true }, which adds a plain text copy of _id to the JSON. Because the id is text and not a number, SvelteKit passes params.id on without Number() in api/plants/[id]/+server.js and shelf/[id]/+page.server.js, and shelf/+page.svelte uses plant.id in the fetch URLs, the {#each} key, the delete filter and the card link.
