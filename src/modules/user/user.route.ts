import { FastifyInstance } from "fastify";
import userController from "./user.controller";
import userMiddleware from "./user.middleware";

async function userRoutes(server: FastifyInstance) {
  server.get("/", () => ({ response: "ok from users route" }));

  server.post(
    "/signup",
    { preValidation: userMiddleware.signupMiddleware },
    userController.signup
  );

  server.post(
    "/signin",
    { preValidation: userMiddleware.signinMiddleware },
    userController.signin
  );

  server.post(
    "/forgotpassword",
    { preValidation: userMiddleware.forgotPasswordMiddleware },
    userController.forgotPassword
  );

  server.post(
    "/resetpassword",
    { preValidation: userMiddleware.resetPasswordMiddleware },
    userController.resetPassword
  );

  server.post(
    "/logout",
    { preValidation: userMiddleware.logoutMiddleware },
    userController.logout
  );

  server.get(
    "/activateuser/:token",
    { preValidation: userMiddleware.activateMiddleware },
    userController.activateUser
  );
}

export default userRoutes;
