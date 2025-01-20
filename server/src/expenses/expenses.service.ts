import * as repository from './expenses.repository';
import { CreateExpenseDto } from './dto/create-expense.dto';

export const createExpense = (data: CreateExpenseDto) =>
  repository.createExpense(data);

export const getAllExpenses = () => repository.getAllExpenses();

export const getExpenseById = (id: number) => repository.getExpenseById(id);

export const updateExpense = (id: number, data: CreateExpenseDto) =>
  repository.updateExpense(id, data);

export const deleteExpense = (id: number) => repository.deleteExpense(id);
