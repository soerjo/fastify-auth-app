import { FastifyInstance } from "fastify";
import userController from "./user.controller";
import { signupMiddleware } from "./user.middleware";

async function userRoutes(server: FastifyInstance) {
  server.post("/", () => ({ response: "ok from users route" }));
  server.post(
    "/signup",
    { preHandler: [signupMiddleware] },
    userController.signup
  );
  server.post("/signin", {}, userController.signin);
  server.post("/forgotpassword", {}, userController.forgotPassword);
  server.post("/resetpassword", {}, userController.resetPassword);
  server.get("/activateuser/:token", {}, userController.activateUser);
}

export default userRoutes;
