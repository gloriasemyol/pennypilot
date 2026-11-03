import Transaction from "../models/Transaction.js";

// GET /api/transactions  → only the logged-in user's transactions, newest first
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id }).sort({ date: -1, createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/transactions
export const addTransaction = async (req, res) => {
  try {
    const { type, category, amount, note, date } = req.body;

    if (!type || !category || !amount) {
      return res.status(400).json({ message: "Type, category and amount are required" });
    }
    if (!["income", "expense"].includes(type)) {
      return res.status(400).json({ message: "Type must be income or expense" });
    }
    if (Number(amount) <= 0) {
      return res.status(400).json({ message: "Amount must be more than 0" });
    }

    const transaction = await Transaction.create({
      user: req.user._id,
      type,
      category,
      amount: Number(amount),
      note,
      date: date || Date.now(),
    });

    res.status(201).json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/transactions/:id
export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    // Make sure it belongs to this user (can't delete other people's data)
    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await transaction.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};