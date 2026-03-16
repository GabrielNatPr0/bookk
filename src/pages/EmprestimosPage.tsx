import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Livro = Tables<"livros">;

interface EmprestimoRow {
  id: string;
  livro_id: string;
  usuario_id: string;
  data_saida: string;
  data_devolucao_prevista: string;
  data_devolucao_real: string | null;
  status: string;
  livros: { titulo: string; autor: string } | null;
  perfis: { nome: string } | null;
}

export default function EmprestimosPage() {
  const { isAdmin, user } = useAuth();
  const [emprestimos, setEmprestimos] = useState<EmprestimoRow[]>([]);
  const [livros, setLivros] = useState<Livro[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [livroId, setLivroId] = useState("");
  const [usuarioId, setUsuarioId] = useState("");
  const [dataDevolucao, setDataDevolucao] = useState("");
  const [usuarios, setUsuarios] = useState<{ id: string; nome: string }[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchEmprestimos();
    if (isAdmin) {
      fetchLivros();
      fetchUsuarios();
    }
  }, [isAdmin]);

  const fetchEmprestimos = async () => {
    const { data } = await supabase
      .from("emprestimos")
      .select("*, livros(titulo, autor), perfis:usuario_id(nome)")
      .order("data_saida", { ascending: false });
    setEmprestimos((data as any) ?? []);
  };

  const fetchLivros = async () => {
    const { data } = await supabase
      .from("livros")
      .select("*")
      .gt("estoque_disponivel", 0)
      .order("titulo");
    setLivros(data ?? []);
  };

  const fetchUsuarios = async () => {
    const { data } = await supabase.from("perfis").select("id, nome");
    setUsuarios(data ?? []);
  };

  const handleCreate = async () => {
    if (!livroId || !usuarioId || !dataDevolucao) return;

    const { error } = await supabase.from("emprestimos").insert({
      livro_id: livroId,
      usuario_id: usuarioId,
      data_devolucao_prevista: new Date(dataDevolucao).toISOString(),
    });

    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Empréstimo registrado!" });
    setDialogOpen(false);
    setLivroId("");
    setUsuarioId("");
    setDataDevolucao("");
    fetchEmprestimos();
    fetchLivros();
  };

  const handleReturn = async (id: string) => {
    const { error } = await supabase
      .from("emprestimos")
      .update({ status: "devolvido", data_devolucao_real: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Devolução registrada!" });
    fetchEmprestimos();
  };

  return (
    <AppLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Empréstimos</h1>
          <p className="text-muted-foreground">Gestão de empréstimos de livros</p>
        </div>
        {isAdmin && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="mr-2 h-4 w-4" /> Registrar Empréstimo</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Novo Empréstimo</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label>Livro</Label>
                  <Select value={livroId} onValueChange={setLivroId}>
                    <SelectTrigger><SelectValue placeholder="Selecione um livro" /></SelectTrigger>
                    <SelectContent>
                      {livros.map((l) => (
                        <SelectItem key={l.id} value={l.id}>
                          {l.titulo} ({l.estoque_disponivel} disp.)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Usuário</Label>
                  <Select value={usuarioId} onValueChange={setUsuarioId}>
                    <SelectTrigger><SelectValue placeholder="Selecione um usuário" /></SelectTrigger>
                    <SelectContent>
                      {usuarios.map((u) => (
                        <SelectItem key={u.id} value={u.id}>{u.nome}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Data de Devolução Prevista</Label>
                  <Input
                    type="date"
                    value={dataDevolucao}
                    onChange={(e) => setDataDevolucao(e.target.value)}
                  />
                </div>
                <Button onClick={handleCreate} className="w-full">Registrar</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Livro</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Usuário</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Saída</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Devolução Prevista</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                  {isAdmin && <th className="px-4 py-3 text-left font-medium text-muted-foreground">Ação</th>}
                </tr>
              </thead>
              <tbody>
                {emprestimos.map((e) => {
                  const isOverdue =
                    e.status === "pendente" &&
                    new Date(e.data_devolucao_prevista) < new Date();
                  return (
                    <tr key={e.id} className="border-b last:border-0">
                      <td className="px-4 py-3 font-medium">{e.livros?.titulo}</td>
                      <td className="px-4 py-3">{e.perfis?.nome ?? "—"}</td>
                      <td className="px-4 py-3">
                        {new Date(e.data_saida).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="px-4 py-3">
                        {new Date(e.data_devolucao_prevista).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            e.status === "devolvido"
                              ? "bg-success/10 text-success"
                              : isOverdue
                              ? "bg-warning/10 text-warning"
                              : "bg-primary/10 text-primary"
                          }`}
                        >
                          {e.status === "devolvido"
                            ? "Devolvido"
                            : isOverdue
                            ? "Atrasado"
                            : "Pendente"}
                        </span>
                      </td>
                      {isAdmin && (
                        <td className="px-4 py-3">
                          {e.status === "pendente" && (
                            <Button size="sm" variant="outline" onClick={() => handleReturn(e.id)}>
                              Devolver
                            </Button>
                          )}
                        </td>
                      )}
                    </tr>
                  );
                })}
                {emprestimos.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                      Nenhum empréstimo registrado.
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
