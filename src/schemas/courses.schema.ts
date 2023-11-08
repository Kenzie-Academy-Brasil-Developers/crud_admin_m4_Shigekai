import { z } from "zod";

export const courseSchema = z.object({
    id: z.number().positive(),
    name: z.string().min(3).max(15),
    description: z.string().min(3).max(625)
});

export const createCourseSchema = courseSchema.omit({id: true});
export const courseListSchema = courseSchema.array();


