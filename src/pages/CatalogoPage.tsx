import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Livro = Tables<"livros">;

export default function CatalogoPage() {
  const { isAdmin, user } = useAuth();
  const [livros, setLivros] = useState<Livro[]>([]);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Livro | null>(null);
  const { toast } = useToast();

  // Form state
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [categoria, setCategoria] = useState("");
  const [estoqueTotal, setEstoqueTotal] = useState(1);

  useEffect(() => {
    fetchLivros();
  }, []);

  const fetchLivros = async () => {
    const { data } = await supabase
      .from("livros")
      .select("*")
      .order("titulo");
    setLivros(data ?? []);
  };

  const filtered = livros.filter(
    (l) =>
      l.titulo.toLowerCase().includes(search.toLowerCase()) ||
      l.autor.toLowerCase().includes(search.toLowerCase()) ||
      l.categoria.toLowerCase().includes(search.toLowerCase())
  );

  const resetForm = () => {
    setTitulo("");
    setAutor("");
    setIsbn("");
    setCategoria("Geral");
    setEstoqueTotal(1);
    setEditing(null);
  };

  const openEdit = (livro: Livro) => {
    setEditing(livro);
    setTitulo(livro.titulo);
    setAutor(livro.autor);
    setIsbn(livro.isbn ?? "");
    setCategoria(livro.categoria);
    setEstoqueTotal(livro.estoque_total);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (editing) {
      const diff = estoqueTotal - editing.estoque_total;
      const { error } = await supabase
        .from("livros")
        .update({
          titulo,
          autor,
          isbn: isbn || null,
          categoria,
          estoque_total: estoqueTotal,
          estoque_disponivel: Math.max(0, editing.estoque_disponivel + diff),
        })
        .eq("id", editing.id);
      if (error) {
        toast({ title: "Erro", description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: "Livro atualizado!" });
    } else {
      const { error } = await supabase.from("livros").insert({
        titulo,
        autor,
        isbn: isbn || null,
        categoria: categoria || "Geral",
        estoque_total: estoqueTotal,
        estoque_disponivel: estoqueTotal,
      });
      if (error) {
        toast({ title: "Erro", description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: "Livro adicionado!" });
    }
    setDialogOpen(false);
    resetForm();
    fetchLivros();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("livros").delete().eq("id", id);
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Livro removido!" });
    fetchLivros();
  };

  const handleReservar = async (livroId: string) => {
    if (!user) return;
    const { error } = await supabase.from("reservas").insert({
      livro_id: livroId,
      usuario_id: user.id,
    });
    if (error) {
      toast({ title: "Erro ao reservar", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Reserva realizada!" });
  };

  return (
    <AppLayout>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Catálogo</h1>
          <p className="text-muted-foreground">Acervo da biblioteca</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar livros..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-64"
            />
          </div>
          {isAdmin && (
            <Dialog open={dialogOpen} onOpenChange={(o) => { setDialogOpen(o); if (!o) resetForm(); }}>
              <DialogTrigger asChild>
                <Button><Plus className="mr-2 h-4 w-4" /> Novo Livro</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editing ? "Editar Livro" : "Novo Livro"}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <Label>Título</Label>
                    <Input value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Autor</Label>
                    <Input value={autor} onChange={(e) => setAutor(e.target.value)} required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>ISBN</Label>
                      <Input value={isbn} onChange={(e) => setIsbn(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Categoria</Label>
                      <Input value={categoria} onChange={(e) => setCategoria(e.target.value)} placeholder="Geral" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Quantidade Total</Label>
                    <Input
                      type="number"
                      min={0}
                      value={estoqueTotal}
                      onChange={(e) => setEstoqueTotal(parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <Button onClick={handleSave} className="w-full">
                    {editing ? "Salvar Alterações" : "Adicionar Livro"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      {/* Book grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((livro) => (
          <Card key={livro.id} className="animate-fade-in relative overflow-hidden">
            {/* Availability badge */}
            <span
              className={`absolute right-3 top-3 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                livro.estoque_disponivel > 0
                  ? "bg-success/10 text-success"
                  : "bg-destructive/10 text-destructive"
              }`}
            >
              {livro.estoque_disponivel > 0
                ? `${livro.estoque_disponivel} disp.`
                : "Indisponível"}
            </span>
            <CardContent className="pt-6">
              <p className="text-xs font-medium text-muted-foreground mb-1">{livro.categoria}</p>
              <h3 className="font-semibold leading-tight mb-1">{livro.titulo}</h3>
              <p className="text-sm text-muted-foreground mb-3">{livro.autor}</p>
              {livro.isbn && (
                <p className="text-xs text-muted-foreground mb-3">ISBN: {livro.isbn}</p>
              )}
              <div className="flex gap-2">
                {livro.estoque_disponivel === 0 && (
                  <Button size="sm" variant="outline" onClick={() => handleReservar(livro.id)}>
                    Reservar
                  </Button>
                )}
                {isAdmin && (
                  <>
                    <Button size="sm" variant="ghost" onClick={() => openEdit(livro)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDelete(livro.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground">
            Nenhum livro encontrado.
          </div>
        )}
      </div>
    </AppLayout>
  );
}
