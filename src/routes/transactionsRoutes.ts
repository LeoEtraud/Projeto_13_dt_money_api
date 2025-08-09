import { Router } from "express";
import { CreateTransaction } from "../controllers/Transactions/CreateTransaction";
import { SearchTransaction } from "../controllers/Transactions/SearchTransaction";

const transactionsRoutes = Router();

const Transactions = new CreateTransaction();
const SearchTransactions = new SearchTransaction();

//CREATE TRANSACTION
transactionsRoutes.post("/transactions", Transactions.createTransaction);

//SEARCH TRANSACTION
transactionsRoutes.get(
  "/transactions/search",
  SearchTransactions.searchTransaction
);

export { transactionsRoutes };
