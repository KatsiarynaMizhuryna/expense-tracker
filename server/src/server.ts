import express from 'express';
import expensesRouter from './expenses/expenses.controller';
import { errorHandler } from './helpers/middlewares/errorHandler';

const app = express();

app.use(express.json());

app.use('/api/expenses', expensesRouter);

app.use(errorHandler);

export default app;
