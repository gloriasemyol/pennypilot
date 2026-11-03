import { motion } from "framer-motion";
import { formatCurrency } from "../utils/format";

export default function StatCard({ title, value, icon: Icon, gradient, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass relative overflow-hidden p-6"
    >
      <div className={`absolute -right-6 -top-6 h-28 w-28 rounded-full opacity-20 blur-2xl ${gradient}`} />
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="mt-2 text-2xl font-bold text-white sm:text-3xl">{formatCurrency(value)}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${gradient}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
}