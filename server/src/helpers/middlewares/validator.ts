import { body } from 'express-validator';

export const createExpenseSchema = [
  body('name').isString().withMessage('Name is required').notEmpty(),
  body('amount').isNumeric().withMessage('Amount must be a number').notEmpty(),
  body('currency')
    .isLength({ min: 3, max: 3 })
    .withMessage('Currency must be 3 characters')
    .notEmpty(),
  body('category').isString().withMessage('Category is required').notEmpty()
];
