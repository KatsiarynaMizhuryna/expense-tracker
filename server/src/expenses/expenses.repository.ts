import { prisma } from '../db/db.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { Expense } from './entity/expense.entity';

export const createExpense = async (data: CreateExpenseDto) => {
  return prisma.expense.create({ data });
};

export const getAllExpenses = async (
  pagination: { limit?: number; offset?: number },
  filters: { fromDate?: Date; toDate?: Date }
): Promise<Expense[]> => {
  const { limit, offset } = pagination;
  const { fromDate, toDate } = filters;

  return prisma.expense.findMany({
    where: {
      date: {
        ...(fromDate && { gte: fromDate }),
        ...(toDate && { lte: toDate })
      }
    },
    skip: offset,
    take: limit
  });
};

export const getExpenseById = async (id: number): Promise<Expense | null> => {
  return prisma.expense.findUnique({ where: { id } });
};

export const updateExpense = async (id: number, data: CreateExpenseDto) => {
  return prisma.expense.update({ where: { id }, data });
};

export const deleteExpense = async (id: number) => {
  return prisma.expense.delete({ where: { id } });
};
