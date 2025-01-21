import * as repository from './expenses.repository';
import { CreateExpenseDto } from './dto/create-expense.dto';

export const createExpense = (data: CreateExpenseDto) =>
  repository.createExpense(data);

export const getAllExpenses = (
  pagination: { limit?: number; offset?: number },
  filters: { fromDate?: Date; toDate?: Date }
) => {
  return repository.getAllExpenses(pagination, filters);
};

export const getExpenseById = (id: number) => repository.getExpenseById(id);

export const updateExpense = (id: number, data: CreateExpenseDto) =>
  repository.updateExpense(id, data);

export const deleteExpense = (id: number) => repository.deleteExpense(id);
