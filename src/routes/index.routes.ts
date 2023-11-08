import { Router } from "express";
import { usersRoutes } from "./users.routes";
import { loginRoutes } from "./login.routes";
import { coursesRoutes } from "./courses.routes";

export const routes: Router = Router();

routes.use("/users", usersRoutes);
routes.use("/login", loginRoutes);
routes.use("/courses", coursesRoutes);