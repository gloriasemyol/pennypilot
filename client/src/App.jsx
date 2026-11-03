import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Wallet, CheckCircle2, XCircle } from "lucide-react";

export default function App() {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    axios
      .get("/api/health")
      .then(() => setStatus("ok"))
      .catch(() => setStatus("error"));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b1020] via-[#111936] to-[#1b1247] p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur-xl"
      >
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500">
          <Wallet className="h-8 w-8 text-white" />
        </div>

        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
          PennyPilot
        </h1>
        <p className="mt-2 text-gray-400">Your money's co-pilot</p>

        <div className="mt-8 flex items-center justify-center gap-2 text-sm">
          {status === "checking" && <span>Checking server...</span>}
          {status === "ok" && (
            <>
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              <span className="text-emerald-300">Backend connected</span>
            </>
          )}
          {status === "error" && (
            <>
              <XCircle className="h-5 w-5 text-red-400" />
              <span className="text-red-300">Backend not reachable</span>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}