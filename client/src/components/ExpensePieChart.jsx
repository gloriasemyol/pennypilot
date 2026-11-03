import { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { PieChart as PieIcon } from "lucide-react";
import { useTransactions } from "../context/TransactionContext";
import { CATEGORY_COLORS } from "../utils/constants";
import { formatCurrency } from "../utils/format";

export default function ExpensePieChart() {
  const { transactions } = useTransactions();

  const data = useMemo(() => {
    const totals = {};
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        totals[t.category] = (totals[t.category] || 0) + t.amount;
      });
    return Object.entries(totals).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  return (
    <div className="glass p-6">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
        <PieIcon className="h-5 w-5 text-emerald-400" /> Spending by category
      </h2>

      {data.length === 0 ? (
        <p className="py-16 text-center text-gray-400">Add some expenses to see this chart</p>
      ) : (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={95} paddingAngle={3} stroke="none">
                {data.map((entry) => (
                  <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || "#94a3b8"} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v) => formatCurrency(v)}
                contentStyle={{ background: "#1a2142", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#fff" }}
                itemStyle={{ color: "#fff" }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}