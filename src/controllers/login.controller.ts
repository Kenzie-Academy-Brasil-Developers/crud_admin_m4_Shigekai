import { NextFunction, Request, Response } from "express";
import { loginService } from "../services/login.service";


export const loginController = async (req: Request, res: Response) => {

    const token: string = await loginService(res.locals.user);
    

    return res.status(200).json({token: token});
};