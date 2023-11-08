import { z } from "zod";
import { courseListSchema, courseSchema, createCourseSchema } from "../schemas/courses.schema";
import { QueryResult } from "pg";

export type Course = z.infer<typeof courseSchema>;
export type CreateCourse = z.infer<typeof createCourseSchema>;
export type CourseQuery = QueryResult<Course>;
export type CourseList = z.infer<typeof courseListSchema>;
export type CourseListQuery = QueryResult<CourseList>;