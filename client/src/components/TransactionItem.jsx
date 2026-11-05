import { ArrowUpRight, ArrowDownLeft, Trash2 } from "lucide-react";
import { CATEGORY_COLORS } from "../utils/constants";
import { formatCurrency, formatDate } from "../utils/format";

export default function TransactionItem({ t, onDelete }) {
  const isIncome = t.type === "income";
  const color = CATEGORY_COLORS[t.category] || "#94a3b8";

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-3 transition hover:bg-white/[0.07] sm:gap-4 sm:p-4">
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-11 sm:w-11"
        style={{ background: `${color}22`, color }}
      >
        {isIncome ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-white sm:text-base">{t.category}</p>
        <p className="truncate text-xs text-gray-400">
          {formatDate(t.date)}
          {t.note && ` • ${t.note}`}
        </p>
      </div>

      <p className={`shrink-0 text-sm font-semibold sm:text-base ${isIncome ? "text-emerald-400" : "text-rose-400"}`}>
        {isIncome ? "+" : "-"}
        {formatCurrency(t.amount)}
      </p>

      {onDelete && (
        <button
          onClick={() => onDelete(t._id)}
          className="shrink-0 rounded-lg p-2 text-gray-500 transition hover:bg-rose-500/10 hover:text-rose-400"
          title="Delete"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}