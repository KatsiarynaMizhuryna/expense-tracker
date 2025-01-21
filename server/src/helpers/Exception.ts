import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Request, Response, NextFunction } from 'express';
import { PrismaErrors } from '../constants/errors';
import {
  ERROR_DATABASE_SERVER,
  ERROR_INTERNAL_SERVER,
  ERROR_NOT_FOUND
} from '../constants/messages';
import { HTTPCode } from '../constants/http-code';

export const prismaExceptionMiddleware = (
  error: PrismaClientKnownRequestError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof PrismaClientKnownRequestError) {
    let statusCode = HTTPCode.INTERNAL_SERVER_ERROR;
    let message = ERROR_INTERNAL_SERVER;

    switch (error.code) {
      case PrismaErrors.NOT_FOUND:
        statusCode = HTTPCode.NOT_FOUND;
        message = ERROR_NOT_FOUND;
        break;
      default:
        message = ERROR_DATABASE_SERVER;
        break;
    }

    res.status(statusCode).json({
      statusCode,
      message,
      error: error.message
    });
  }

  next(error);
};
