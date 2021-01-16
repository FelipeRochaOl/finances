import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  // eslint-disable-next-line class-methods-use-this
  private sumTransaction(type: string): number {
    const sum = this.transactions
      .filter(value => value.type === type)
      .map(transaction => transaction.value)
      .reduce((total, currentValue) => total + currentValue, 0);
    return sum;
  }

  public isValidTransaction(newTransaction: Omit<Transaction, 'id'>): boolean {
    if (newTransaction.type === 'outcome') {
      const sumIncome = this.sumTransaction('income');
      const sumOutcome = this.sumTransaction('outcome') + newTransaction.value;
      return sumOutcome < sumIncome;
    }
    return true;
  }

  public getBalance(): Balance {
    const income = this.sumTransaction('income');
    const outcome = this.sumTransaction('outcome');

    return {
      income,
      outcome,
      total: Math.abs(income - outcome),
    };
  }

  public create(transaction: Omit<Transaction, 'id'>): Transaction {
    const newTransaction = new Transaction(transaction);
    this.transactions.push(newTransaction);
    return newTransaction;
  }
}

export default TransactionsRepository;
