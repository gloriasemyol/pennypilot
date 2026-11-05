import { useMemo, useState } from "react";
import { Target, Pencil, Check } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useTransactions } from "../context/TransactionContext";
import { formatCurrency } from "../utils/format";

export default function BudgetCard() {
  const { user } = useAuth();
  const { transactions } = useTransactions();
  const storageKey = `pp_budget_${user.id}`;

  const [budget, setBudget] = useState(() => {
    try {
      return Number(localStorage.getItem(storageKey)) || 0;
    } catch {
      return 0;
    }
  });
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState("");

  // How much did the user spend THIS month?
  const spent = useMemo(() => {
    const now = new Date();
    return transactions
      .filter((t) => {
        const d = new Date(t.date);
        return (
          t.type === "expense" &&
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear()
        );
      })
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  const saveBudget = () => {
    const value = Number(input);
    if (!value || value <= 0) return toast.error("Enter a valid budget");
    setBudget(value);
    try {
      localStorage.setItem(storageKey, String(value));
    } catch {}
    setEditing(false);
    toast.success("Budget saved");
  };

  const percent = budget ? Math.min((spent / budget) * 100, 100) : 0;
  const isOver = budget > 0 && spent > budget;
  const barColor = isOver ? "bg-rose-500" : percent > 80 ? "bg-amber-400" : "bg-emerald-400";

  return (
    <div className="glass p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
          <Target className="h-5 w-5 text-violet-400" /> Monthly budget
        </h2>

        {editing ? (
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="₹ amount"
              className="input !w-32 !py-2"
              autoFocus
            />
            <button onClick={saveBudget} className="btn-primary !px-3 !py-2">
              <Check className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setInput(budget || "");
              setEditing(true);
            }}
            className="btn-ghost !py-2"
          >
            <Pencil className="h-4 w-4" /> {budget ? "Edit" : "Set budget"}
          </button>
        )}
      </div>

      {budget ? (
        <>
          <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
            <div className={`h-full rounded-full transition-all duration-700 ${barColor}`} style={{ width: `${percent}%` }} />
          </div>
          <div className="mt-3 flex justify-between text-sm">
            <span className="text-gray-400">
              Spent <span className="font-semibold text-white">{formatCurrency(spent)}</span> of {formatCurrency(budget)}
            </span>
            <span className={isOver ? "font-semibold text-rose-400" : "text-emerald-400"}>
              {isOver ? `Over by ${formatCurrency(spent - budget)}` : `${formatCurrency(budget - spent)} left`}
            </span>
          </div>
        </>
      ) : (
        <p className="text-sm text-gray-400">Set a monthly budget to track how much you can still spend.</p>
      )}
    </div>
  );
}