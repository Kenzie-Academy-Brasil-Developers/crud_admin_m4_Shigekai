import { Router } from "express";
import { cancelUserEnrollmentController, enrollUserOnCourseController, getCoursesController, getUsersOnCourseController, postCourseController } from "../controllers/courses.controller";
import { bodyValidator } from "../middlewares/bodyValidator.middleware";
import { createCourseSchema } from "../schemas/courses.schema";
import { isTokenValid } from "../middlewares/isTokenValid.middleware";
import { verifyAdmin } from "../middlewares/verifyAdmin.middleware";
import { verifyUser } from "../middlewares/verifyUser.middleware";
import { verifyCourse } from "../middlewares/verifyCourse.middleware";

export const coursesRoutes: Router = Router();

coursesRoutes.post(
    "/",
    isTokenValid,
    verifyAdmin,
    bodyValidator(createCourseSchema),
    postCourseController
);

coursesRoutes.get("/", getCoursesController);

coursesRoutes.post(
    "/:courseId/users/:userId",
    isTokenValid,
    verifyAdmin,
    verifyUser,
    verifyCourse,
    enrollUserOnCourseController
);

coursesRoutes.delete(
    "/:courseId/users/:userId",
    verifyUser,
    verifyCourse,
    isTokenValid,
    verifyAdmin,
    cancelUserEnrollmentController
);

coursesRoutes.get("/:id/users", isTokenValid, verifyAdmin, getUsersOnCourseController);

