import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/ping', (req: Request, res: Response) => {
  res.json({ message: 'pong' });
});

app.post('/expenses', async (req: Request, res: Response) => {
  const { name, amount, currency, category } = req.body;
  const date = new Date().toISOString();

  try {
    const expense = await prisma.expense.create({
      data: {
        name,
        amount,
        currency,
        category,
        date
      }
    });

    res.status(201).json({
      message: 'Expense record has been successfully created.',
      expense
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating expense record.' });
  }
});

app.get('/expenses', async (req: Request, res: Response) => {
  try {
    const expenses = await prisma.expense.findMany();
    res.status(200).json(expenses);
  } catch (error) {
    console.error('Error fetching expense:', error);
    res.status(500).json({ message: 'Error fetching expenses.' });
  }
});

app.get('/expenses/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const expense = await prisma.expense.findUnique({
      where: { id: parseInt(id) }
    });

    if (expense) {
      res.status(200).json(expense);
    } else {
      res.status(404).json({ message: 'Expense record not found.' });
    }
  } catch (error) {
    console.error('Error fetching expense:', error);
    res.status(500).json({ message: 'Error fetching expense.' });
  }
});

app.put('/expenses/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, amount, currency, category } = req.body;
  const date = new Date().toISOString();

  try {
    const updatedExpense = await prisma.expense.update({
      where: { id: parseInt(id) },
      data: { name, amount, currency, category, date }
    });

    res.status(200).json({
      message: 'Expense record has been successfully updated.',
      expense: updatedExpense
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: 'Expense record not found.' });
  }
});

app.delete('/expenses/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedExpense = await prisma.expense.delete({
      where: { id: parseInt(id) }
    });

    res.status(200).json({
      message: 'Expense record has been successfully deleted.',
      expense: deletedExpense
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: 'Expense record not found.' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
