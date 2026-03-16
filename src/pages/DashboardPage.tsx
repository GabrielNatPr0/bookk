import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ArrowLeftRight, AlertTriangle, CalendarClock } from "lucide-react";

interface DashboardStats {
  totalLivros: number;
  emprestimosAtivos: number;
  atrasados: number;
  reservasPendentes: number;
}

export default function DashboardPage() {
  const { isAdmin } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalLivros: 0,
    emprestimosAtivos: 0,
    atrasados: 0,
    reservasPendentes: 0,
  });
  const [recentLoans, setRecentLoans] = useState<any[]>([]);

  useEffect(() => {
    fetchStats();
    fetchRecentLoans();
  }, []);

  const fetchStats = async () => {
    const [livros, emprestimos, reservas] = await Promise.all([
      supabase.from("livros").select("estoque_disponivel", { count: "exact" }),
      supabase.from("emprestimos").select("*").eq("status", "pendente"),
      supabase.from("reservas").select("*", { count: "exact" }).eq("ativa", true),
    ]);

    const totalDisponivel = livros.data?.reduce((s, l) => s + l.estoque_disponivel, 0) ?? 0;
    const now = new Date().toISOString();
    const atrasados = emprestimos.data?.filter((e) => e.data_devolucao_prevista < now).length ?? 0;

    setStats({
      totalLivros: totalDisponivel,
      emprestimosAtivos: emprestimos.data?.length ?? 0,
      atrasados,
      reservasPendentes: reservas.count ?? 0,
    });
  };

  const fetchRecentLoans = async () => {
    const { data } = await supabase
      .from("emprestimos")
      .select("*, livros(titulo, autor)")
      .eq("status", "pendente")
      .order("data_saida", { ascending: false })
      .limit(5);
    setRecentLoans(data ?? []);
  };

  const statCards = [
    { label: "Livros Disponíveis", value: stats.totalLivros, icon: BookOpen, color: "text-primary" },
    { label: "Empréstimos Ativos", value: stats.emprestimosAtivos, icon: ArrowLeftRight, color: "text-primary" },
    { label: "Atrasados", value: stats.atrasados, icon: AlertTriangle, color: "text-warning" },
    { label: "Reservas Pendentes", value: stats.reservasPendentes, icon: CalendarClock, color: "text-muted-foreground" },
  ];

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral da biblioteca</p>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {statCards.map((s) => (
          <Card key={s.label} className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent loans */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Empréstimos Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          {recentLoans.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhum empréstimo ativo.</p>
          ) : (
            <div className="space-y-3">
              {recentLoans.map((loan) => {
                const isOverdue = new Date(loan.data_devolucao_prevista) < new Date();
                return (
                  <div key={loan.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="font-medium">{loan.livros?.titulo}</p>
                      <p className="text-sm text-muted-foreground">{loan.livros?.autor}</p>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        isOverdue
                          ? "bg-warning/10 text-warning"
                          : "bg-success/10 text-success"
                      }`}
                    >
                      {isOverdue ? "Atrasado" : "Em dia"}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </AppLayout>
  );
}
