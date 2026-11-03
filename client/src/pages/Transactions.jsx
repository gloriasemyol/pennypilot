import { useMemo, useState } from "react";
import { FilterX, Inbox } from "lucide-react";
import { useTransactions } from "../context/TransactionContext";
import TransactionItem from "../components/TransactionItem";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../utils/constants";
import { formatCurrency } from "../utils/format";

const ALL_CATEGORIES = [...new Set([...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES])];

export default function Transactions() {
  const { transactions, loading, deleteTransaction } = useTransactions();
  const [type, setType] = useState("all");
  const [category, setCategory] = useState("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const filtered = useMemo(
    () =>
      transactions.filter((t) => {
        if (type !== "all" && t.type !== type) return false;
        if (category !== "all" && t.category !== category) return false;
        const d = new Date(t.date);
        if (from && d < new Date(from)) return false;
        if (to && d > new Date(to + "T23:59:59")) return false;
        return true;
      }),
    [transactions, type, category, from, to]
  );

  const resetFilters = () => {
    setType("all");
    setCategory("all");
    setFrom("");
    setTo("");
  };

  const total = filtered.reduce((sum, t) => sum + (t.type === "income" ? t.amount : -t.amount), 0);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Transactions</h1>
        <p className="text-sm text-gray-400">All your income and expenses in one place</p>
      </div>

      {/* Filter bar */}
      <div className="glass mb-6 space-y-4 p-4">
        <div className="flex gap-2">
          {["all", "income", "expense"].map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`rounded-xl px-4 py-2 text-sm font-medium capitalize transition ${
                type === t
                  ? "bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-900"
                  : "bg-white/5 text-gray-400 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="input">
            <option value="all">All categories</option>
            {ALL_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="input" />
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="input" />
          <button onClick={resetFilters} className="btn-ghost">
            <FilterX className="h-4 w-4" /> Reset
          </button>
        </div>
      </div>

      {/* Summary line */}
      <p className="mb-3 text-sm text-gray-400">
        Showing {filtered.length} transaction{filtered.length !== 1 && "s"} • Net:{" "}
        <span className={total >= 0 ? "text-emerald-400" : "text-rose-400"}>{formatCurrency(total)}</span>
      </p>

      {/* List */}
      {loading ? (
        <p className="py-10 text-center text-gray-400">Loading...</p>
      ) : filtered.length === 0 ? (
        <div className="glass flex flex-col items-center py-16 text-gray-400">
          <Inbox className="mb-3 h-10 w-10" />
          <p>No transactions found. Tap the + button to add one!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((t) => (
            <TransactionItem key={t._id} t={t} onDelete={deleteTransaction} />
          ))}
        </div>
      )}
    </div>
  );
}