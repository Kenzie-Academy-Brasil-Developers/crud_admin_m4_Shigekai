import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../database";
import { User, UserQueryResult } from "../interfaces/users.interface";
import AppError from "../errors/App.error";

export const verifyEmailDuplication = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { email } = req.body;
    if (!email) return next();
  
    const query: UserQueryResult = await client.query(
      'SELECT * FROM "users" WHERE "email" = $1',
      [email]
    );
  
    if (query.rowCount !== 0) {
      throw new AppError("Email already registered", 409);
    }
  
    return next();
  };
  