import { body } from 'express-validator';
import { VALIDATION_MESSAGES } from '../../constants/messages';

export const createExpenseSchema = [
  body('name')
    .isString()
    .withMessage(VALIDATION_MESSAGES.NAME_REQUIRED)
    .notEmpty(),
  body('amount')
    .isNumeric()
    .withMessage(VALIDATION_MESSAGES.AMOUNT_INVALID)
    .notEmpty(),
  body('currency')
    .isLength({ min: 3, max: 3 })
    .withMessage(VALIDATION_MESSAGES.CURRENCY_INVALID)
    .notEmpty(),
  body('category')
    .isString()
    .withMessage(VALIDATION_MESSAGES.CATEGORY_REQUIRED)
    .notEmpty()
];
