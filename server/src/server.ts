import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import db from './db/db.service';
import { Expense } from './db/models';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/ping', (req: Request, res: Response) => {
  res.json({ message: 'pong' });
});

app.post('/expenses', (req: Request<{}, {}, Expense>, res: Response) => {
  const { name, amount, currency, category } = req.body;
  const date = new Date().toISOString();
  const insert = db.prepare(`
    INSERT INTO expenses (name, amount, currency, category, date)
    VALUES (?, ?, ?, ?, ?)
  `);
  const result = insert.run(name, amount, currency, category, date);
  res.status(201).json({
    message: 'Expense record has been successfully created.',
    expense: {
      id: result.lastInsertRowid,
      name,
      amount,
      currency,
      category,
      date
    }
  });
});

app.get('/expenses', async (req: Request, res: Response) => {
  const selectQuery = `SELECT * FROM expenses;`;
  const expenses = db.prepare(selectQuery).all();
  res.status(200).json(expenses);
});

app.get('/expenses/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const selectQuery = `SELECT * FROM expenses WHERE id = ?;`;
  const expense = db.prepare(selectQuery).get(id);

  if (expense) {
    res.status(200).json(expense);
  } else {
    res.status(404).json({ message: 'Expense record not found.' });
  }
});

app.put('/expenses/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, amount, currency, category } = req.body;
  const date = new Date().toISOString();

  const updateQuery = `
    UPDATE expenses 
    SET name = ?, amount = ?, currency = ?, category = ?, date = ? 
    WHERE id = ?;
  `;
  const result = db
    .prepare(updateQuery)
    .run(name, amount, currency, category, date, id);

  if (result.changes > 0) {
    res.status(200).json({
      message: 'Expense record has been successfully updated.',
      expense: {
        id,
        name,
        amount,
        currency,
        category,
        date
      }
    });
  } else {
    res.status(404).json({ message: 'Expense record not found.' });
  }
});

app.delete('/expenses/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const deleteQuery = `DELETE FROM expenses WHERE id = ?;`;
  const result = db.prepare(deleteQuery).run(id);

  if (result.changes > 0) {
    res
      .status(200)
      .json({ message: 'Expense record has been successfully deleted.' });
  } else {
    res.status(404).json({ message: 'Expense record not found.' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
