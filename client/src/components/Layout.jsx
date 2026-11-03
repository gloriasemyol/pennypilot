import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Plus } from "lucide-react";
import Navbar from "./Navbar";
import AddTransactionModal from "./AddTransactionModal";

export default function Layout() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1020] via-[#111936] to-[#1b1247]">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8 pb-28">
        <Outlet />
      </main>

      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 text-slate-900 shadow-lg shadow-emerald-500/30 transition hover:scale-110 active:scale-95"
        title="Add transaction"
      >
        <Plus className="h-7 w-7" />
      </button>

      <AddTransactionModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}