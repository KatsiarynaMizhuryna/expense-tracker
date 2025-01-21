import { Request, Response, NextFunction } from 'express';
import { ERROR_INTERNAL_SERVER } from '../../constants/messages';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || ERROR_INTERNAL_SERVER });
};
