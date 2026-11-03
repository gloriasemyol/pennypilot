import { NavLink, useNavigate } from "react-router-dom";
import { Wallet, LayoutDashboard, ReceiptText, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${
      isActive ? "bg-white/10 text-emerald-300" : "text-gray-400 hover:text-white"
    }`;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b1020]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500">
            <Wallet className="h-5 w-5 text-white" />
          </div>
          <span className="hidden text-lg font-bold text-white sm:block">PennyPilot</span>
        </div>

        <nav className="flex items-center gap-1">
          <NavLink to="/dashboard" className={linkClass}>
            <LayoutDashboard className="h-4 w-4" />
            <span className="hidden sm:block">Dashboard</span>
          </NavLink>
          <NavLink to="/transactions" className={linkClass}>
            <ReceiptText className="h-4 w-4" />
            <span className="hidden sm:block">Transactions</span>
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm font-bold text-white">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <button onClick={handleLogout} className="btn-ghost !px-3" title="Log out">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}