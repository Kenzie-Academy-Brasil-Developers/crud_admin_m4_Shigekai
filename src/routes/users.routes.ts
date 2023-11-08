import { Router } from "express";
import { createUserController, getUserCoursesController, getUsersController, getUsersCoursesController } from "../controllers/users.controller";
import { bodyValidator } from "../middlewares/bodyValidator.middleware";
import { createUserBodySchema } from "../schemas/users.schema";
import { verifyEmailDuplication } from "../middlewares/verifyEmailDuplication.middleware";
import { isTokenValid } from "../middlewares/isTokenValid.middleware";
import { verifyAdmin } from "../middlewares/verifyAdmin.middleware";
import { verifyUserEnrollment } from "../middlewares/verifyUserEnrollment";

export const usersRoutes: Router = Router();

usersRoutes.post(
"/",
bodyValidator(createUserBodySchema),
verifyEmailDuplication,
createUserController
);

usersRoutes.get("/", isTokenValid, verifyAdmin, getUsersController);

usersRoutes.get("/:id/courses", isTokenValid, verifyAdmin, verifyUserEnrollment, getUserCoursesController);
