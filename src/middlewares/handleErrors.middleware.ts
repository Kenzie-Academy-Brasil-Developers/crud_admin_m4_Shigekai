import { NextFunction, Request, Response } from "express";

import { z } from "zod";
import AppError from "../errors/App.error";
import { JsonWebTokenError } from "jsonwebtoken";

export const handleErrors = (error: Error, req: Request, res: Response, next: NextFunction) => {

    if(error instanceof AppError){
        return res.status(error.status).json({message: error.message});
    };

    if(error instanceof z.ZodError){
        return res.status(400).json(error.flatten().fieldErrors);        
    };

    if(error instanceof JsonWebTokenError){
        return res.status(401).json({message: error.message});
    };

    console.error(error);
    return res.status(500).json({message: "Internal server error"});
};