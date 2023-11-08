import { Request, Response } from "express";
import { ReturnUser, ReturnUsers } from "../interfaces/users.interface";
import { createUserService, getUserCoursesService, getUsersCoursesService, getUsersService } from "../services/users.service";

export const createUserController = async (req: Request, res: Response) => {
    const user: ReturnUser = await createUserService(req.body);

    return res.status(201).json(user);
};

export const getUsersController = async (req: Request, res: Response) => {
    const users: ReturnUsers = await getUsersService();

    return res.status(200).json(users);
};

export const getUsersCoursesController = async (req: Request, res: Response) => {
    const userCourses = await getUsersCoursesService(req.params.id);

    return res.status(200).json(userCourses);
};

export const getUserCoursesController = async (req: Request, res: Response) => {
    const userCourses = await getUserCoursesService(req.params.id);

    return res.status(200).json(userCourses);
};