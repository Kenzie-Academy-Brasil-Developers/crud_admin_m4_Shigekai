import { z } from "zod";

export const userCourseSchema = z.object({
    id: z.number().positive(),
    active: z.boolean().default(true),
    userId: z.number().positive(),
    courseId: z.number().positive()
});

export const userCourseBodySchema = userCourseSchema.omit({id: true, active: true});