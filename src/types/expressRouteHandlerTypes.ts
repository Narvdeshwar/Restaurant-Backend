import { NextFunction, Request, Response } from "express";

export type Controller = (req: Request, res: Response, next: NextFunction) => Promise<Response | void>

// The controller returns a response on success or calls next(error) to forward errors to the error handler
