import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  BookOpen,
  ArrowLeftRight,
  CalendarClock,
  Users,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/catalogo", label: "Catálogo", icon: BookOpen },
  { to: "/emprestimos", label: "Empréstimos", icon: ArrowLeftRight },
  { to: "/reservas", label: "Reservas", icon: CalendarClock },
];

const adminItems = [
  { to: "/usuarios", label: "Usuários", icon: Users },
];

export default function AppSidebar() {
  const { profile, isAdmin, signOut } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const allItems = isAdmin ? [...navItems, ...adminItems] : navItems;

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="fixed left-4 top-4 z-50 rounded-lg bg-sidebar p-2 text-sidebar-foreground md:hidden"
      >
        {collapsed ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col bg-sidebar text-sidebar-foreground transition-transform duration-150 ease-out",
          "w-64 md:translate-x-0",
          collapsed ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
            <BookOpen className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight">BiblioGestão</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {allItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setCollapsed(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-muted hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* User info */}
        <div className="border-t border-sidebar-border p-4">
          <div className="mb-3 text-sm">
            <p className="font-medium">{profile?.nome || "Usuário"}</p>
            <p className="text-xs text-sidebar-muted">
              {isAdmin ? "Administrador" : "Leitor"}
            </p>
          </div>
          <button
            onClick={signOut}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-sidebar-muted hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </div>
      </aside>
    </>
  );
}
