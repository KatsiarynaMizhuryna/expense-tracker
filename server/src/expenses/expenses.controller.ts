import express, { Request, Response, NextFunction } from 'express';
import * as service from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { createExpenseSchema } from '../helpers/middlewares/validator';
import { validationResult } from 'express-validator';
import {
  ERROR_INVALID_INPUT,
  ERROR_NOT_FOUND,
  SUCCESS_CREATE_EXPENSE,
  SUCCESS_DELETE_EXPENSE,
  SUCCESS_UPDATE_EXPENSE
} from '../constants/messages';

const router = express.Router();

router.post(
  '/',
  createExpenseSchema,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ message: ERROR_INVALID_INPUT });
      return;
    }

    try {
      const data: CreateExpenseDto = req.body;
      const expense = await service.createExpense(data);
      res.status(201).json({ message: SUCCESS_CREATE_EXPENSE, expense });
    } catch (error) {
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
    res.status(200).json(expenses);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const expense = await service.getExpenseById(id);

    if (!expense) {
      res.status(404).json({ message: ERROR_NOT_FOUND });
    } else {
      res.status(200).json(expense);
    }
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/:id',
  createExpenseSchema,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ message: ERROR_INVALID_INPUT });
      return;
    }

    try {
      const id = parseInt(req.params.id);
      const data: CreateExpenseDto = req.body;
      const updatedExpense = await service.updateExpense(id, data);

      res.status(200).json({
        message: SUCCESS_UPDATE_EXPENSE,
        expense: updatedExpense
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      await service.deleteExpense(id);

      res.status(200).json({ message: SUCCESS_DELETE_EXPENSE });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
