import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { BarChart3 } from "lucide-react";
import { useTransactions } from "../context/TransactionContext";
import { formatCurrency } from "../utils/format";

export default function MonthlyBarChart() {
  const { transactions } = useTransactions();

  const data = useMemo(() => {
    // Build the last 6 months
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setDate(1);
      d.setMonth(d.getMonth() - i);
      months.push({
        key: `${d.getFullYear()}-${d.getMonth()}`,
        label: d.toLocaleString("en-IN", { month: "short" }),
        income: 0,
        expense: 0,
      });
    }
    // Drop each transaction into its month
    transactions.forEach((t) => {
      const d = new Date(t.date);
      const m = months.find((x) => x.key === `${d.getFullYear()}-${d.getMonth()}`);
      if (m) m[t.type] += t.amount;
    });
    return months;
  }, [transactions]);

  return (
    <div className="glass p-6">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
        <BarChart3 className="h-5 w-5 text-cyan-400" /> Monthly trends
      </h2>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis dataKey="label" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : v)} />
            <Tooltip
              formatter={(v) => formatCurrency(v)}
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
              contentStyle={{ background: "#1a2142", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#fff" }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="income" name="Income" fill="#34d399" radius={[6, 6, 0, 0]} />
            <Bar dataKey="expense" name="Expense" fill="#fb7185" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}