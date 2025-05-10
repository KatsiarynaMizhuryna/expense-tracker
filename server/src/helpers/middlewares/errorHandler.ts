import { Request, Response, NextFunction } from 'express';
import { ERROR_INTERNAL_SERVER } from '../../constants/messages';
import { HTTPCode } from '../../constants/http-code';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  res
    .status(err.status || HTTPCode.INTERNAL_SERVER_ERROR)
    .json({ message: err.message || ERROR_INTERNAL_SERVER });
};
