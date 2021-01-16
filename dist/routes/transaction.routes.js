"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var TransactionsRepository_1 = __importDefault(require("../repositories/TransactionsRepository"));
var CreateTransactionService_1 = __importDefault(require("../services/CreateTransactionService"));
var transactionRouter = express_1.Router();
var transactionsRepository = new TransactionsRepository_1.default();
transactionRouter.get('/', function (request, response) {
    try {
        var transactions = transactionsRepository.all();
        var balance = transactionsRepository.getBalance();
        return response.status(200).json({ transactions: transactions, balance: balance });
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
transactionRouter.post('/', function (request, response) {
    try {
        var _a = request.body, title = _a.title, value = _a.value, type = _a.type;
        var transaction = {
            title: title,
            value: parseFloat(value),
            type: type,
        };
        var createTransaction = new CreateTransactionService_1.default(transactionsRepository);
        if (!transactionsRepository.isValidTransaction(transaction)) {
            throw new Error('Outcome cannot be superior launch the income transactions');
        }
        var newTransaction = createTransaction.execute(transaction);
        return response.status(201).json(newTransaction);
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
exports.default = transactionRouter;
