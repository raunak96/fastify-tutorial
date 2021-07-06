const {
	getItemById,
	getItems,
	addItem,
	removeItem,
	updateItem,
} = require("../controllers/items");

const ItemSchema = {
	type: "object",
	properties: {
		id: { type: "string" },
		name: { type: "string" },
	},
};

const paramSchema = {
	type: "object",
	properties: {
		id: { type: "string" },
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
		params: paramSchema,
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

const addItemOpts = {
	schema: {
		body: {
			type: "object",
			required: ["name"],
			properties: {
				name: { type: "string" },
			},
		},
		response: {
			201: ItemSchema,
		},
	},
	handler: addItem,
};

const removeItemOpts = {
	schema: {
		params: paramSchema,
		response: {
			200: {
				type: "object",
				properties: {
					message: { type: "string" },
				},
			},
		},
	},
	handler: removeItem,
};

const updateItemOpts = {
	schema: {
		params: paramSchema,
		body: {
			type: "object",
			required: ["name"],
			properties: {
				name: { type: "string" },
			},
		},
		response: {
			201: ItemSchema,
		},
	},
	handler: updateItem,
};

const itemRoutes = (fastify, options, done) => {
	fastify.get("/items", getItemsOpts);

	fastify.get("/items/:id", getItemOpts);

	fastify.post("/items", addItemOpts);

	fastify.delete("/items/:id", removeItemOpts);

	fastify.put("/items/:id", updateItemOpts);

	done();
};

module.exports = itemRoutes;
