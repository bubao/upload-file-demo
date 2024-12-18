const { PrismaClient } = require("../../.prisma-client");

class Prisma {
	static init() {
		if (!this.instance) {
			this.instance = new PrismaClient({
				log: ["query", "info", "warn", "error"]
			});
		}
		// this.instance.$on("query", (query, params) => {
		// 	console.log(query, params);
		// });
		return this.instance;
	}
}

module.exports = Prisma.init();
