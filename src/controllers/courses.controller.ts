import { Request, Response } from "express";
import { Course, CourseList } from "../interfaces/courses.interface";
import { cancelUserEnrollmentService, enrollUserOnCourseService, getCoursesService, getUsersOnCourseService, postCourseService } from "../services/courses.service";
import { UserCourse, UserCourseBody } from "../interfaces/userCourses.interface";
import { QueryConfig } from "pg";
import { client } from "../database";
import { getUsersSchema } from "../schemas/users.schema";

export const postCourseController = async (req: Request, res: Response) => {
    const newCourse: Course = await postCourseService(req.body);

    return res.status(201).json(newCourse);
};

export const getCoursesController = async (req: Request, res: Response) => {
    const courses = await getCoursesService();

    res.status(200).json(courses);
};

export const enrollUserOnCourseController = async (req: Request, res: Response) => {
    const enrollUserObject: UserCourseBody = {
        userId: parseInt(req.params.userId),
        courseId: parseInt(req.params.courseId)
    };

    const newUserCourse: UserCourse = await enrollUserOnCourseService(enrollUserObject);

    return res.status(201).json({message: "User successfully vinculed to course"});
};

export const cancelUserEnrollmentController = async (req: Request, res: Response) => {
    await cancelUserEnrollmentService(req.params.userId, req.params.courseId);

    return res.status(204).json();
};

export const getUsersOnCourseController = async (req: Request, res: Response) => {
   const usersOnCourse = await getUsersOnCourseService(req.params.id);

   return res.status(200).json(usersOnCourse);
};