const { v4: uuidV4 } = require("uuid");
let items = require("../data");

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

const addItem = async (req, res) => {
	const { name } = req.body;

	const item = { id: uuidV4(), name };
	items = [...items, item];

	res.code(201).send(item);
};

const removeItem = async (req, res) => {
	const { id } = req.params;
	const itemToDelete = items.findIndex(item => item.id === id);

	if (itemToDelete === -1) {
		const error = new Error("Item does not exist!");
		res.code(404).send(error);
	}
	items.splice(itemToDelete, 1);
	res.send({ message: `Item ${id} deleted successfully` });
};

const updateItem = async (req, res) => {
	const { id } = req.params;
	const { name } = req.body;
	const itemToDelete = items.findIndex(item => item.id === id);

	if (itemToDelete === -1) {
		const error = new Error("Item does not exist!");
		res.code(404).send(error);
	}
	const updatedItem = { ...items[itemToDelete], name };
	items[itemToDelete] = updatedItem;
	res.send(updatedItem);
};

module.exports = { getItems, getItemById, addItem, removeItem, updateItem };
