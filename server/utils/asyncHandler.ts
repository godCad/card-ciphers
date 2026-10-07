import type { NextFunction, Request, Response } from 'express';

type AsyncRoute = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

// forward rejected promises to express's error middleware instead of crashing
export const asyncHandler =
  (fn: AsyncRoute) => (req: Request, res: Response, next: NextFunction) =>
    fn(req, res, next).catch(next);
