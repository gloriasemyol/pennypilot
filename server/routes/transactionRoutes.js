import express from "express";
import {
  getTransactions,
  addTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect); // every route below needs a valid token

router.route("/").get(getTransactions).post(addTransaction);
router.delete("/:id", deleteTransaction);

export default router;