import { prisma } from '../db/db.service';
import { CreateExpenseDto } from './dto/create-expense.dto';

export const createExpense = async (data: CreateExpenseDto) => {
  return prisma.expense.create({ data });
};

export const getAllExpenses = async () => {
  return prisma.expense.findMany();
};

export const getExpenseById = async (id: number) => {
  return prisma.expense.findUnique({ where: { id } });
};

export const updateExpense = async (id: number, data: CreateExpenseDto) => {
  return prisma.expense.update({ where: { id }, data });
};

export const deleteExpense = async (id: number) => {
  return prisma.expense.delete({ where: { id } });
};
