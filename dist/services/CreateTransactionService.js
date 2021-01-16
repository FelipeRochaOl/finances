"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CreateTransactionService = /** @class */ (function () {
    function CreateTransactionService(transactionsRepository) {
        this.transactionsRepository = transactionsRepository;
    }
    CreateTransactionService.prototype.execute = function (transaction) {
        return this.transactionsRepository.create(transaction);
    };
    return CreateTransactionService;
}());
exports.default = CreateTransactionService;
