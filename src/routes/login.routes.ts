import { Router } from "express";
import { verifyLogin } from "../middlewares/verifyLogin.middleware";
import { bodyValidator } from "../middlewares/bodyValidator.middleware";
import { loginSchema } from "../schemas/login.schema";
import { loginController } from "../controllers/login.controller";

export const loginRoutes: Router = Router();

loginRoutes.post("/", bodyValidator(loginSchema), verifyLogin, loginController);
