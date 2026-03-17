import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ArrowLeftRight, CalendarClock, Shield, Users, TrendingUp } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight">BiblioGestão</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Recursos
            </a>
            <a href="#benefits" className="text-sm font-medium hover:text-primary transition-colors">
              Benefícios
            </a>
            <Link to="/docs" className="text-sm font-medium hover:text-primary transition-colors">
              Documentação
            </Link>
            <Link to="/login">
              <Button variant="outline" size="sm">Entrar</Button>
            </Link>
            <Link to="/login">
              <Button size="sm">Começar Agora</Button>
            </Link>
          </nav>
          <div className="md:hidden">
            <Link to="/login">
              <Button size="sm">Entrar</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Gerencie sua biblioteca de forma inteligente
          </h1>
          <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
            BiblioGestão é um sistema completo de gerenciamento de bibliotecas que facilita o controle
            de livros, empréstimos e reservas. Tudo em uma plataforma moderna e intuitiva.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/login">
              <Button size="lg" className="w-full sm:w-auto">
                Criar Conta Gratuita
              </Button>
            </Link>
            <Link to="/docs">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Ver Documentação
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section id="features" className="border-t bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Recursos Principais</h2>
            <p className="text-muted-foreground">
              Tudo que você precisa para gerenciar sua biblioteca
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <BookOpen className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Catálogo Digital</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Organize todo o acervo da biblioteca com informações detalhadas de cada livro,
                  incluindo autor, ISBN, categoria e disponibilidade em tempo real.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <ArrowLeftRight className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Gestão de Empréstimos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Controle completo de empréstimos com datas de devolução, alertas de atraso
                  e histórico detalhado de cada transação.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CalendarClock className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Sistema de Reservas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Permita que usuários reservem livros indisponíveis e recebam notificações
                  automáticas quando ficarem disponíveis.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Controle de Acesso</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Sistema de autenticação seguro com diferentes níveis de permissão para
                  administradores e leitores.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Gerenciamento de Usuários</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Cadastre e gerencie usuários da biblioteca, atribua papéis e acompanhe
                  o histórico de cada leitor.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Dashboard Analítico</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Visualize métricas importantes como livros disponíveis, empréstimos ativos
                  e estatísticas de uso da biblioteca.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="benefits" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="mb-4 text-3xl font-bold">Para Bibliotecários</h2>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Automatize processos</h3>
                    <p className="text-muted-foreground">
                      Reduza o trabalho manual com automação de empréstimos, devoluções e alertas de atraso.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Controle total do acervo</h3>
                    <p className="text-muted-foreground">
                      Tenha visibilidade completa do estoque, localização e status de cada livro.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Relatórios instantâneos</h3>
                    <p className="text-muted-foreground">
                      Gere relatórios e estatísticas em tempo real para tomada de decisões.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-3xl font-bold">Para Leitores</h2>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Busca facilitada</h3>
                    <p className="text-muted-foreground">
                      Encontre livros rapidamente por título, autor ou categoria no catálogo digital.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Reserve com antecedência</h3>
                    <p className="text-muted-foreground">
                      Reserve livros que estão emprestados e seja notificado quando ficarem disponíveis.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Acompanhe seus empréstimos</h3>
                    <p className="text-muted-foreground">
                      Veja o status dos seus empréstimos e prazos de devolução em um painel intuitivo.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t bg-muted/30 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Como Funciona</h2>
          <p className="mb-12 text-muted-foreground">Comece em 3 passos simples</p>
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                1
              </div>
              <h3 className="mb-2 text-xl font-semibold">Crie sua Conta</h3>
              <p className="text-muted-foreground">
                Cadastre-se gratuitamente com seu email e senha. O processo leva menos de 1 minuto.
              </p>
            </div>
            <div>
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                2
              </div>
              <h3 className="mb-2 text-xl font-semibold">Configure o Sistema</h3>
              <p className="text-muted-foreground">
                Adicione os livros do acervo e configure usuários. Tudo através de uma interface simples.
              </p>
            </div>
            <div>
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                3
              </div>
              <h3 className="mb-2 text-xl font-semibold">Comece a Gerenciar</h3>
              <p className="text-muted-foreground">
                Registre empréstimos, aceite reservas e acompanhe tudo em tempo real no dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-4 text-3xl font-bold">Pronto para começar?</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Junte-se a dezenas de bibliotecas que já utilizam o BiblioGestão para
              gerenciar seus acervos de forma eficiente.
            </p>
            <Link to="/login">
              <Button size="lg">
                Criar Conta Gratuita
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <BookOpen className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold">BiblioGestão</span>
            </div>
            <div className="flex gap-6">
              <Link to="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Documentação
              </Link>
              <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Login
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              2024 BiblioGestão. Sistema de gestão de bibliotecas.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
