const items = require("../data");

const getItems = async (req, res) => {
	res.send(items);
};

const getItemById = async (req, res) => {
	const { id } = req.params;
	const item = items.find(item => item.id === id);
	if (!item) {
		const error = new Error("Item does not exist!");
		res.code(404).send(error);
	}
	res.send(item);
};

module.exports = { getItems, getItemById };
