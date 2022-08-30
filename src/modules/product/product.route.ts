import { FastifyInstance } from "fastify";

async function productRoutes(server: FastifyInstance) {
  server.post("/", () => ({ response: "of from product route" }));
}

export default productRoutes;
