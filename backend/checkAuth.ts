import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { authSecret } from "./routers/authRouter";

export function checkAuth(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).send("unauthorized ");

  const token = authorization.split(" ")[1];
  try {
    jwt.verify(token, authSecret);
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send("invalid credential  ");
  }

  // throw new Error("Function not implemented.");
}
