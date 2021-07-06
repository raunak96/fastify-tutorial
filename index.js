const fastify = require("fastify")({ logger: true });

const PORT = 5000;

fastify.register(require("fastify-swagger"), {
	exposeRoute: true,
	routePrefix: "/docs",
	swagger: {
		info: { title: "rawn-fastify-api" },
	},
});

fastify.register(require("./routes/items"));

const startServer = async () => {
	try {
		await fastify.listen(PORT);
	} catch (error) {
		fastify.log.error(error);
		process.exit(1);
	}
};

startServer();
