import { Request, Response, NextFunction } from "express";

export type Parameter = any[];
export type Function = (...params: Parameter) => any;
export type AsyncFunction = (...params: Parameter) => Promise<any>;

export type MiddlewareFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => any;

export type AsyncMiddlewareFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;
