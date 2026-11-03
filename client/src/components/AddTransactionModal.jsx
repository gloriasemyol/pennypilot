import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useTransactions } from "../context/TransactionContext";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../utils/constants";

// today's date in YYYY-MM-DD using the user's local time
const today = () =>
  new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];

export default function AddTransactionModal({ open, onClose }) {
  const { addTransaction } = useTransactions();
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0]);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(today());
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  const categories = type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  const switchType = (t) => {
    setType(t);
    setCategory(t === "expense" ? EXPENSE_CATEGORIES[0] : INCOME_CATEGORIES[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return toast.error("Enter a valid amount");

    setSaving(true);
    try {
      await addTransaction({ type, category, amount: Number(amount), date, note });
      toast.success("Transaction added");
      setAmount("");
      setNote("");
      setDate(today());
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not add transaction");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="glass w-full max-w-md bg-[#111936]/90 p-6"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Add transaction</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Income / Expense toggle */}
              <div className="grid grid-cols-2 gap-2 rounded-xl bg-white/5 p-1">
                {["expense", "income"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => switchType(t)}
                    className={`rounded-lg py-2 text-sm font-semibold capitalize transition ${
                      type === t
                        ? t === "expense"
                          ? "bg-rose-500 text-white"
                          : "bg-emerald-500 text-white"
                        : "text-gray-400"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <select value={category} onChange={(e) => setCategory(e.target.value)} className="input">
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Amount (₹)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="input"
              />

              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input" />

              <input
                placeholder="Note (optional)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="input"
              />

              <button type="submit" disabled={saving} className="btn-primary w-full">
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                Save transaction
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}