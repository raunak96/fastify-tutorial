const { getItemById, getItems } = require("../controllers/items");
const items = require("../data");

const ItemSchema = {
	type: "object",
	properties: {
		id: { type: "string" },
		name: { type: "string" },
	},
};

const getItemsOpts = {
	schema: {
		response: {
			200: {
				type: "array",
				items: ItemSchema,
			},
		},
	},
	handler: getItems,
};

const getItemOpts = {
	schema: {
		response: {
			200: ItemSchema,
			404: {
				type: "object",
				properties: {
					statusCode: { type: "number" },
					error: { type: "string" },
					message: { type: "string" },
				},
			},
		},
	},
	handler: getItemById,
};

const itemRoutes = (fastify, options, done) => {
	fastify.get("/items", getItemsOpts);

	fastify.get("/items/:id", getItemOpts);
	done();
};

module.exports = itemRoutes;
