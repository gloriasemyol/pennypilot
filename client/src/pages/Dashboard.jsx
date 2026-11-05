import { useMemo } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTransactions } from "../context/TransactionContext";
import StatCard from "../components/StatCard";
import BudgetCard from "../components/BudgetCard";
import ExpensePieChart from "../components/ExpensePieChart";
import MonthlyBarChart from "../components/MonthlyBarChart";
import TransactionItem from "../components/TransactionItem";
import Skeleton from "../components/Skeleton";

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
};

export default function Dashboard() {
  const { user } = useAuth();
  const { transactions, loading } = useTransactions();

  const { income, expense, balance } = useMemo(() => {
    const income = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const expense = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    return { income, expense, balance: income - expense };
  }, [transactions]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          {getGreeting()}, {user.name.split(" ")[0]} 👋
        </h1>
        <p className="text-sm text-gray-400">Here's how your money is doing</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <StatCard title="Total Balance" value={balance} icon={Wallet} gradient="bg-gradient-to-br from-violet-500 to-fuchsia-500" delay={0} />
          <StatCard title="Total Income" value={income} icon={TrendingUp} gradient="bg-gradient-to-br from-emerald-400 to-teal-500" delay={0.1} />
          <StatCard title="Total Expenses" value={expense} icon={TrendingDown} gradient="bg-gradient-to-br from-rose-500 to-orange-500" delay={0.2} />
        </div>
      )}

      <BudgetCard />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ExpensePieChart />
        <MonthlyBarChart />
      </div>

      <div className="glass p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Recent transactions</h2>
          <Link to="/transactions" className="text-sm text-emerald-300 hover:underline">
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
          </div>
        ) : transactions.length === 0 ? (
          <p className="py-8 text-center text-gray-400">Nothing yet. Tap the + button to add your first transaction!</p>
        ) : (
          <div className="space-y-3">
            {transactions.slice(0, 5).map((t) => (
              <TransactionItem key={t._id} t={t} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}