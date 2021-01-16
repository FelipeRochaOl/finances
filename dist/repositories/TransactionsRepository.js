"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Transaction_1 = __importDefault(require("../models/Transaction"));
var TransactionsRepository = /** @class */ (function () {
    function TransactionsRepository() {
        this.transactions = [];
    }
    TransactionsRepository.prototype.all = function () {
        return this.transactions;
    };
    // eslint-disable-next-line class-methods-use-this
    TransactionsRepository.prototype.sumTransaction = function (type) {
        var sum = this.transactions
            .filter(function (value) { return value.type === type; })
            .map(function (transaction) { return transaction.value; })
            .reduce(function (total, currentValue) { return total + currentValue; }, 0);
        return sum;
    };
    TransactionsRepository.prototype.isValidTransaction = function (newTransaction) {
        if (newTransaction.type === 'outcome') {
            var sumIncome = this.sumTransaction('income');
            var sumOutcome = this.sumTransaction('outcome') + newTransaction.value;
            return sumOutcome < sumIncome;
        }
        return true;
    };
    TransactionsRepository.prototype.getBalance = function () {
        var income = this.sumTransaction('income');
        var outcome = this.sumTransaction('outcome');
        return {
            income: income,
            outcome: outcome,
            total: Math.abs(income - outcome),
        };
    };
    TransactionsRepository.prototype.create = function (transaction) {
        var newTransaction = new Transaction_1.default(transaction);
        this.transactions.push(newTransaction);
        return newTransaction;
    };
    return TransactionsRepository;
}());
exports.default = TransactionsRepository;
