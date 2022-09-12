import Fastify from "fastify";
import cors from "@fastify/cors";
import { server_config } from "./configs/config";

import userRoutes from "./modules/user/user.route";
import productRoutes from "./modules/product/product.route";
import { dbConnection } from "./configs/db_mysql";

const port = server_config.port;
const fastify = Fastify();

// MIDDLEWARE
fastify.register(cors, { origin: "*" });

// ROUTE
fastify.register(productRoutes, { prefix: "/api/produk" });
fastify.register(userRoutes, { prefix: "/api/users" });
fastify.get("/", () => ({ response: "ok" }));

const startServer = async () => {
  try {
    await dbConnection();
    await fastify.listen({ port });
    console.log(`Server is running on ${port}`);
  } catch (error) {}
};

startServer();
