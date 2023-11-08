import { z } from "zod";
import { userCourseBodySchema, userCourseSchema } from "../schemas/userCourse.schema";
import { QueryResult } from "pg";

export type UserCourse = z.infer<typeof userCourseSchema>;
export type UserCourseQuery = QueryResult<UserCourse>;
export type UserCourseBody = z.infer<typeof userCourseBodySchema>;
