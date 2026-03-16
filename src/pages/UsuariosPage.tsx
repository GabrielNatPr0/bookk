import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import type { Tables } from "@/integrations/supabase/types";

type Perfil = Tables<"perfis">;

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Perfil[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    const { data } = await supabase
      .from("perfis")
      .select("*")
      .order("nome");
    setUsuarios(data ?? []);
  };

  const handleChangeRole = async (userId: string, newRole: "admin" | "leitor") => {
    const { error } = await supabase
      .from("perfis")
      .update({ tipo: newRole })
      .eq("id", userId);

    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Papel atualizado!" });
    fetchUsuarios();
  };

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Usuários</h1>
        <p className="text-muted-foreground">Gerenciar usuários da biblioteca</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Nome</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Tipo</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Cadastro</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Ação</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u) => (
                  <tr key={u.id} className="border-b last:border-0">
                    <td className="px-4 py-3 font-medium">{u.nome}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          u.tipo === "admin"
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {u.tipo === "admin" ? "Admin" : "Leitor"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {new Date(u.created_at).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-4 py-3">
                      <Select
                        value={u.tipo}
                        onValueChange={(v) => handleChangeRole(u.id, v as "admin" | "leitor")}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="leitor">Leitor</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                ))}
                {usuarios.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                      Nenhum usuário encontrado.
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
