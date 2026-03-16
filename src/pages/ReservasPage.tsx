import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface ReservaRow {
  id: string;
  livro_id: string;
  usuario_id: string;
  data_reserva: string;
  ativa: boolean;
  livros: { titulo: string; autor: string } | null;
  perfis: { nome: string } | null;
}

export default function ReservasPage() {
  const { isAdmin } = useAuth();
  const [reservas, setReservas] = useState<ReservaRow[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchReservas();
  }, []);

  const fetchReservas = async () => {
    const { data } = await supabase
      .from("reservas")
      .select("*, livros(titulo, autor), perfis:usuario_id(nome)")
      .order("data_reserva", { ascending: false });
    setReservas((data as any) ?? []);
  };

  const handleCancel = async (id: string) => {
    const { error } = await supabase
      .from("reservas")
      .update({ ativa: false })
      .eq("id", id);
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Reserva cancelada." });
    fetchReservas();
  };

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Reservas</h1>
        <p className="text-muted-foreground">Gestão de reservas de livros</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Livro</th>
                  {isAdmin && <th className="px-4 py-3 text-left font-medium text-muted-foreground">Usuário</th>}
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Data da Reserva</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Ação</th>
                </tr>
              </thead>
              <tbody>
                {reservas.map((r) => (
                  <tr key={r.id} className="border-b last:border-0">
                    <td className="px-4 py-3 font-medium">{r.livros?.titulo}</td>
                    {isAdmin && <td className="px-4 py-3">{r.perfis?.nome ?? "—"}</td>}
                    <td className="px-4 py-3">
                      {new Date(r.data_reserva).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          r.ativa
                            ? "bg-warning/10 text-warning"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {r.ativa ? "Ativa" : "Cancelada"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {r.ativa && (
                        <Button size="sm" variant="outline" onClick={() => handleCancel(r.id)}>
                          Cancelar
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
                {reservas.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                      Nenhuma reserva encontrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
