import { FastifyInstance } from "fastify";
import * as productMiddleware from "./product.middleware";
import * as proudctController from "./product.controller";

async function productRoutes(server: FastifyInstance) {
  server.get("/", () => ({ response: "of from product route" }));

  server.post(
    "/",
    { preValidation: productMiddleware.getProductMiddleware },
    proudctController.getProduct
  );

  server.post(
    "/add",
    { preValidation: productMiddleware.addProductMiddleware },
    proudctController.addProduct
  );

  server.post(
    "/:kodeproduk",
    { preValidation: productMiddleware.detailProductMiddleware },
    proudctController.detailProduct
  );

  server.post(
    "/update",
    { preValidation: productMiddleware.updateProductMiddleware },
    proudctController.updateProduct
  );

  server.post(
    "/delete",
    { preValidation: productMiddleware.deleteProductMiddleware },
    proudctController.deleteProduct
  );
}

export default productRoutes;
