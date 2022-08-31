import { FastifyInstance } from "fastify";
import userController from "./user.controller";
import userMiddleware from "./user.middleware";

async function userRoutes(server: FastifyInstance) {
  server.post("/", () => ({ response: "ok from users route" }));

  server.post(
    "/signup",
    { preHandler: [userMiddleware.signupMiddleware] },
    userController.signup
  );

  server.post(
    "/signin",
    { preHandler: [userMiddleware.signinMiddleware] },
    userController.signin
  );

  server.post(
    "/forgotpassword",
    { preHandler: [userMiddleware.forgotPasswordMiddleware] },
    userController.forgotPassword
  );

  server.post(
    "/resetpassword",
    { preHandler: [userMiddleware.resetPasswordMiddleware] },
    userController.resetPassword
  );

  server.get(
    "/activateuser/:token",
    { preHandler: [userMiddleware.activateMiddleware] },
    userController.activateUser
  );
}

export default userRoutes;
