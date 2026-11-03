import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../utils/api";
import { useAuth } from "./AuthContext";

const TransactionContext = createContext();

export const useTransactions = () => useContext(TransactionContext);

export function TransactionProvider({ children }) {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load transactions whenever a user logs in
  useEffect(() => {
    if (!user) {
      setTransactions([]);
      return;
    }
    setLoading(true);
    api
      .get("/transactions")
      .then((res) => setTransactions(res.data))
      .catch(() => toast.error("Could not load transactions"))
      .finally(() => setLoading(false));
  }, [user?.id]);

  const addTransaction = async (data) => {
    const res = await api.post("/transactions", data);
    setTransactions((prev) =>
      [res.data, ...prev].sort((a, b) => new Date(b.date) - new Date(a.date))
    );
  };

  // Optimistic delete: remove from screen first, undo if the server fails
  const deleteTransaction = async (id) => {
    const backup = transactions;
    setTransactions((prev) => prev.filter((t) => t._id !== id));
    try {
      await api.delete(`/transactions/${id}`);
      toast.success("Transaction deleted");
    } catch {
      setTransactions(backup);
      toast.error("Could not delete");
    }
  };

  return (
    <TransactionContext.Provider
      value={{ transactions, loading, addTransaction, deleteTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
}