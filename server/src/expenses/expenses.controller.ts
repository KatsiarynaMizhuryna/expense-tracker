import express, { Request, Response, NextFunction } from 'express';
import * as service from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { createExpenseSchema } from '../helpers/middlewares/validator';
import { validationResult } from 'express-validator';

const router = express.Router();

router.post(
  '/',
  createExpenseSchema,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const data: CreateExpenseDto = req.body;
      const expense = await service.createExpense(data);
      res
        .status(201)
        .json({ message: 'Expense created successfully', expense });
    } catch (error) {
      next(error);
    }
  }
);

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const expenses = await service.getAllExpenses();
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
      res.status(404).json({ message: 'Expense not found' });
    } else {
      res.status(200).json(expense);
    }
  } catch (error) {
    next(error);
  }
});

router.put(
  '/:id',
  createExpenseSchema,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const id = parseInt(req.params.id);
      const data: CreateExpenseDto = req.body;
      const updatedExpense = await service.updateExpense(id, data);

      res.status(200).json({
        message: 'Expense updated successfully',
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

      res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
