import express, { Request, Response, NextFunction } from 'express';
import * as service from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { createExpenseSchema } from '../helpers/middlewares/validator';
import { validationResult } from 'express-validator';
import {
  ERROR_CREATE_EXPENSE,
  ERROR_DELETE_EXPENSE,
  ERROR_FETCH_EXPENSE,
  ERROR_INVALID_INPUT,
  ERROR_NOT_FOUND,
  ERROR_UPDATE_EXPENSE,
  SUCCESS_CREATE_EXPENSE,
  SUCCESS_DELETE_EXPENSE,
  SUCCESS_UPDATE_EXPENSE
} from '../constants/messages';
import logger from '../helpers/Logger';
import { HTTPCode } from '../constants/http-code';

const router = express.Router();

router.post(
  '/',
  createExpenseSchema,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn(ERROR_INVALID_INPUT, { errors: errors.array() });
      res.status(HTTPCode.BAD_REQUEST).json({ message: ERROR_INVALID_INPUT });
      return;
    }

    try {
      const data: CreateExpenseDto = req.body;
      const expense = await service.createExpense(data);
      logger.info(SUCCESS_CREATE_EXPENSE, { expense });
      res
        .status(HTTPCode.CREATED)
        .json({ message: SUCCESS_CREATE_EXPENSE, expense });
    } catch (error) {
      logger.error(ERROR_CREATE_EXPENSE, { error });
      next(error);
    }
  }
);

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { limit, offset, fromDate, toDate } = req.query;
    const pagination = {
      limit: limit ? parseInt(limit as string, 10) : undefined,
      offset: offset ? parseInt(offset as string, 10) : undefined
    };

    const filters = {
      fromDate: fromDate ? new Date(fromDate as string) : undefined,
      toDate: toDate ? new Date(toDate as string) : undefined
    };

    const expenses = await service.getAllExpenses(pagination, filters);
    res.status(HTTPCode.OK).json(expenses);
  } catch (error) {
    logger.error(ERROR_FETCH_EXPENSE, { error });
    next(error);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const expense = await service.getExpenseById(id);

    if (!expense) {
      logger.error(ERROR_NOT_FOUND);
      res.status(HTTPCode.NOT_FOUND).json({ message: ERROR_NOT_FOUND });
    } else {
      res.status(HTTPCode.OK).json(expense);
    }
  } catch (error) {
    logger.error(ERROR_FETCH_EXPENSE, { error });
    next(error);
  }
});

router.patch(
  '/:id',
  createExpenseSchema,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn(ERROR_INVALID_INPUT, { errors: errors.array() });
      res.status(HTTPCode.BAD_REQUEST).json({ message: ERROR_INVALID_INPUT });
      return;
    }

    try {
      const id = parseInt(req.params.id);
      const data: CreateExpenseDto = req.body;
      const updatedExpense = await service.updateExpense(id, data);
      logger.info(SUCCESS_UPDATE_EXPENSE, { updatedExpense });

      res.status(HTTPCode.OK).json({
        message: SUCCESS_UPDATE_EXPENSE,
        expense: updatedExpense
      });
    } catch (error) {
      logger.error(ERROR_UPDATE_EXPENSE, { error });
      next(error);
    }
  }
);

router.delete(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const deletedExpense = await service.deleteExpense(id);

      if (!deletedExpense) {
        logger.warn(ERROR_NOT_FOUND, { id });
        res.status(HTTPCode.NOT_FOUND).json({ message: ERROR_NOT_FOUND });
        return;
      }
      logger.info(SUCCESS_DELETE_EXPENSE);
      res.status(HTTPCode.OK).json({ message: SUCCESS_DELETE_EXPENSE });
    } catch (error) {
      logger.error(ERROR_DELETE_EXPENSE, { error });
      next(error);
    }
  }
);

export default router;
