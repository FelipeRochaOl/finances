import { Router } from 'express';
import Transaction from '../models/Transaction';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();
    return response.status(200).json({ transactions, balance });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;
    const transaction: Omit<Transaction, 'id'> = {
      title,
      value: parseFloat(value),
      type,
    };
    const createTransaction = new CreateTransactionService(
      transactionsRepository,
    );

    if (!transactionsRepository.isValidTransaction(transaction)) {
      throw new Error(
        'Outcome cannot be superior launch the income transactions',
      );
    }

    const newTransaction = createTransaction.execute(transaction);
    return response.status(201).json(newTransaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
