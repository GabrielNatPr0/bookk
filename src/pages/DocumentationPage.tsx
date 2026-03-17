import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, ArrowLeft, BookText, Users, ArrowLeftRight, CalendarClock, Shield, ChartBar as BarChart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight">BiblioGestão</span>
          </Link>
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">Documentação</h1>
          <p className="text-lg text-muted-foreground">
            Guia completo para usar o BiblioGestão
          </p>
        </div>

        <Tabs defaultValue="intro" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="intro">Introdução</TabsTrigger>
            <TabsTrigger value="getting-started">Começando</TabsTrigger>
            <TabsTrigger value="features">Recursos</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          <TabsContent value="intro" className="space-y-6">
            <Card>
              <CardContent className="prose prose-slate max-w-none pt-6">
                <h2 className="flex items-center gap-2 text-2xl font-bold">
                  <BookText className="h-6 w-6 text-primary" />
                  O que é o BiblioGestão?
                </h2>
                <p>
                  O BiblioGestão é um sistema completo de gerenciamento de bibliotecas desenvolvido
                  para facilitar a administração de acervos, empréstimos e reservas de livros.
                  Com uma interface moderna e intuitiva, o sistema atende tanto bibliotecários quanto leitores.
                </p>

                <h3 className="text-xl font-semibold mt-6">Principais Características</h3>
                <ul className="space-y-2">
                  <li>
                    <strong>Interface Intuitiva:</strong> Design limpo e fácil de usar, sem curva de aprendizado complexa.
                  </li>
                  <li>
                    <strong>Tempo Real:</strong> Todas as informações são atualizadas instantaneamente no sistema.
                  </li>
                  <li>
                    <strong>Segurança:</strong> Sistema de autenticação robusto com diferentes níveis de permissão.
                  </li>
                  <li>
                    <strong>Responsivo:</strong> Funciona perfeitamente em desktop, tablet e celular.
                  </li>
                  <li>
                    <strong>Baseado em Nuvem:</strong> Acesse de qualquer lugar com conexão à internet.
                  </li>
                </ul>

                <h3 className="text-xl font-semibold mt-6">Tecnologias Utilizadas</h3>
                <p>
                  O BiblioGestão é construído com tecnologias modernas e confiáveis:
                </p>
                <ul>
                  <li><strong>Frontend:</strong> React + TypeScript + Vite</li>
                  <li><strong>UI:</strong> Shadcn/ui + Tailwind CSS</li>
                  <li><strong>Backend:</strong> Supabase (PostgreSQL + Autenticação)</li>
                  <li><strong>Hospedagem:</strong> Plataforma em nuvem com alta disponibilidade</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="getting-started" className="space-y-6">
            <Card>
              <CardContent className="prose prose-slate max-w-none pt-6">
                <h2 className="text-2xl font-bold">Primeiros Passos</h2>

                <h3 className="text-xl font-semibold mt-6">1. Criar uma Conta</h3>
                <p>
                  Para começar a usar o BiblioGestão, você precisa criar uma conta:
                </p>
                <ol>
                  <li>Acesse a página de login clicando no botão "Entrar" ou "Criar Conta"</li>
                  <li>Clique em "Cadastre-se" na parte inferior do formulário</li>
                  <li>Preencha seu nome completo, email e senha (mínimo 6 caracteres)</li>
                  <li>Clique em "Cadastrar" para criar sua conta</li>
                  <li>Verifique seu email para confirmar o cadastro</li>
                </ol>
                <p className="bg-muted p-4 rounded-lg">
                  <strong>Nota:</strong> Por padrão, novas contas são criadas como "Leitor".
                  Para obter permissões de administrador, entre em contato com um admin existente.
                </p>

                <h3 className="text-xl font-semibold mt-6">2. Fazer Login</h3>
                <p>
                  Após criar sua conta e verificar o email:
                </p>
                <ol>
                  <li>Na página de login, insira seu email e senha</li>
                  <li>Clique em "Entrar"</li>
                  <li>Você será redirecionado para o dashboard do sistema</li>
                </ol>

                <h3 className="text-xl font-semibold mt-6">3. Navegação no Sistema</h3>
                <p>
                  O sistema possui um menu lateral (sidebar) com as seguintes opções:
                </p>
                <ul>
                  <li><strong>Dashboard:</strong> Visão geral com estatísticas e métricas</li>
                  <li><strong>Catálogo:</strong> Lista completa de livros disponíveis</li>
                  <li><strong>Empréstimos:</strong> Gerenciamento de empréstimos ativos</li>
                  <li><strong>Reservas:</strong> Gestão de reservas de livros</li>
                  <li><strong>Usuários:</strong> Gerenciar usuários (apenas para admins)</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6">4. Personalização do Perfil</h3>
                <p>
                  Seu nome e tipo de usuário aparecem na parte inferior da sidebar.
                  Para sair do sistema, clique no botão "Sair".
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h2 className="mb-6 text-2xl font-bold">Recursos Detalhados</h2>

                <div className="space-y-8">
                  <div>
                    <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
                      <BarChart className="h-5 w-5 text-primary" />
                      Dashboard
                    </h3>
                    <p className="mb-3 text-muted-foreground">
                      O dashboard oferece uma visão geral instantânea da biblioteca:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Número total de livros disponíveis no acervo</li>
                      <li>Quantidade de empréstimos ativos no momento</li>
                      <li>Contador de empréstimos atrasados</li>
                      <li>Número de reservas pendentes</li>
                      <li>Lista dos 5 empréstimos mais recentes com status</li>
                    </ul>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
                      <BookOpen className="h-5 w-5 text-primary" />
                      Catálogo de Livros
                    </h3>
                    <p className="mb-3 text-muted-foreground">
                      Gerencie todo o acervo da biblioteca:
                    </p>
                    <h4 className="font-semibold mt-4 mb-2">Para Leitores:</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Buscar livros por título, autor ou categoria</li>
                      <li>Ver disponibilidade em tempo real</li>
                      <li>Reservar livros que estão emprestados</li>
                      <li>Visualizar informações detalhadas (ISBN, categoria, etc.)</li>
                    </ul>
                    <h4 className="font-semibold mt-4 mb-2">Para Administradores:</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Adicionar novos livros ao acervo</li>
                      <li>Editar informações de livros existentes</li>
                      <li>Remover livros do catálogo</li>
                      <li>Gerenciar quantidade total e disponível de cada título</li>
                      <li>Organizar livros por categorias personalizadas</li>
                    </ul>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
                      <ArrowLeftRight className="h-5 w-5 text-primary" />
                      Gestão de Empréstimos
                    </h3>
                    <p className="mb-3 text-muted-foreground">
                      Controle completo do ciclo de empréstimos:
                    </p>
                    <h4 className="font-semibold mt-4 mb-2">Funcionalidades:</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Registrar novos empréstimos com data de devolução prevista</li>
                      <li>Selecionar livro e usuário através de menus dropdown</li>
                      <li>Visualizar todos os empréstimos em formato de tabela</li>
                      <li>Identificar empréstimos atrasados automaticamente</li>
                      <li>Registrar devoluções com um clique</li>
                      <li>Histórico completo de empréstimos (ativos e finalizados)</li>
                    </ul>
                    <h4 className="font-semibold mt-4 mb-2">Status dos Empréstimos:</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li><strong>Pendente:</strong> Livro ainda não foi devolvido</li>
                      <li><strong>Atrasado:</strong> Data de devolução passou e livro não foi devolvido</li>
                      <li><strong>Devolvido:</strong> Livro foi devolvido com sucesso</li>
                    </ul>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
                      <CalendarClock className="h-5 w-5 text-primary" />
                      Sistema de Reservas
                    </h3>
                    <p className="mb-3 text-muted-foreground">
                      Permite que leitores reservem livros indisponíveis:
                    </p>
                    <h4 className="font-semibold mt-4 mb-2">Como Funciona:</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Quando um livro está com estoque zero, aparece o botão "Reservar"</li>
                      <li>Leitor clica para criar uma reserva</li>
                      <li>Reserva fica registrada no sistema com status "Ativa"</li>
                      <li>Quando o livro for devolvido, a reserva pode ser processada</li>
                      <li>Usuários podem cancelar suas próprias reservas</li>
                    </ul>
                    <h4 className="font-semibold mt-4 mb-2">Gerenciamento:</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Lista todas as reservas do sistema</li>
                      <li>Filtra por status (ativa ou cancelada)</li>
                      <li>Admins veem todas as reservas com nomes dos usuários</li>
                      <li>Leitores veem apenas suas próprias reservas</li>
                    </ul>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
                      <Users className="h-5 w-5 text-primary" />
                      Gerenciamento de Usuários
                    </h3>
                    <p className="mb-3 text-muted-foreground">
                      Controle de usuários e permissões (apenas para admins):
                    </p>
                    <h4 className="font-semibold mt-4 mb-2">Funcionalidades:</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Visualizar lista completa de usuários cadastrados</li>
                      <li>Ver tipo de cada usuário (Admin ou Leitor)</li>
                      <li>Alterar papel de usuários entre Admin e Leitor</li>
                      <li>Visualizar data de cadastro de cada usuário</li>
                    </ul>
                    <h4 className="font-semibold mt-4 mb-2">Tipos de Usuário:</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li><strong>Admin:</strong> Acesso total ao sistema, pode gerenciar livros, empréstimos e usuários</li>
                      <li><strong>Leitor:</strong> Pode buscar livros, fazer reservas e ver seus próprios empréstimos</li>
                    </ul>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
                      <Shield className="h-5 w-5 text-primary" />
                      Segurança e Privacidade
                    </h3>
                    <p className="mb-3 text-muted-foreground">
                      O sistema implementa múltiplas camadas de segurança:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Autenticação baseada em email e senha</li>
                      <li>Senhas criptografadas no banco de dados</li>
                      <li>Sessões seguras com tokens JWT</li>
                      <li>Controle de acesso baseado em papéis (RBAC)</li>
                      <li>Row Level Security (RLS) no banco de dados</li>
                      <li>Validação de dados no frontend e backend</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq" className="space-y-6">
            <Card>
              <CardContent className="prose prose-slate max-w-none pt-6">
                <h2 className="text-2xl font-bold">Perguntas Frequentes</h2>

                <div className="space-y-6 mt-6">
                  <div>
                    <h3 className="text-lg font-semibold">Como me torno um administrador?</h3>
                    <p>
                      Por questões de segurança, novas contas são criadas como "Leitor" por padrão.
                      Para obter permissões de administrador, você precisa solicitar a um administrador
                      existente que altere seu papel na página de Usuários.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">O que acontece quando um livro está indisponível?</h3>
                    <p>
                      Quando todos os exemplares de um livro estão emprestados, o sistema automaticamente
                      mostra o botão "Reservar" no catálogo. Você pode criar uma reserva e será notificado
                      quando o livro estiver disponível novamente.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Como funciona o controle de estoque?</h3>
                    <p>
                      Cada livro tem dois campos de estoque:
                    </p>
                    <ul>
                      <li><strong>Estoque Total:</strong> Quantidade total de exemplares que a biblioteca possui</li>
                      <li><strong>Estoque Disponível:</strong> Quantidade de exemplares disponíveis para empréstimo no momento</li>
                    </ul>
                    <p>
                      Quando um empréstimo é registrado, o estoque disponível diminui. Quando o livro é
                      devolvido, o estoque disponível aumenta novamente.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Posso editar um empréstimo depois de criado?</h3>
                    <p>
                      Atualmente, empréstimos não podem ser editados após a criação. Você pode apenas
                      registrar a devolução quando o livro for devolvido. Isso garante a integridade
                      do histórico de transações.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Como são identificados os empréstimos atrasados?</h3>
                    <p>
                      O sistema compara automaticamente a data de devolução prevista com a data atual.
                      Se a data atual for maior que a data prevista e o livro ainda não foi devolvido,
                      o empréstimo é marcado como "Atrasado" e exibido com destaque visual.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Posso usar o sistema no celular?</h3>
                    <p>
                      Sim! O BiblioGestão é totalmente responsivo e funciona perfeitamente em
                      smartphones e tablets. A interface se adapta automaticamente ao tamanho da tela.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Como cancelar uma reserva?</h3>
                    <p>
                      Acesse a página de Reservas e localize sua reserva na lista. Clique no botão
                      "Cancelar" ao lado da reserva que deseja cancelar. A reserva será marcada
                      como inativa, mas permanecerá no histórico.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Os dados são seguros?</h3>
                    <p>
                      Sim. O BiblioGestão utiliza Supabase, uma plataforma de banco de dados
                      enterprise com recursos de segurança robustos, incluindo criptografia,
                      backups automáticos e proteção contra SQL injection. Todas as senhas são
                      criptografadas e nunca armazenadas em texto plano.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Posso exportar relatórios?</h3>
                    <p>
                      A funcionalidade de exportação de relatórios está planejada para versões
                      futuras. Atualmente, você pode visualizar todas as informações nas respectivas
                      páginas do sistema.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Preciso de suporte técnico, como proceder?</h3>
                    <p>
                      Para suporte técnico, dúvidas ou sugestões, entre em contato através do
                      email ou formulário de contato disponível no sistema. Nossa equipe responde
                      em até 24 horas úteis.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="mb-4 text-xl font-semibold">Ainda tem dúvidas?</h3>
                <p className="mb-4 text-muted-foreground">
                  Se você não encontrou a resposta que procurava, experimente:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Revisar as outras seções desta documentação</li>
                  <li>Explorar o sistema e testar as funcionalidades</li>
                  <li>Entrar em contato com o suporte técnico</li>
                </ul>
                <div className="mt-6">
                  <Link to="/login">
                    <Button>Começar a Usar o Sistema</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <footer className="border-t bg-muted/30 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>2024 BiblioGestão. Sistema de gestão de bibliotecas.</p>
        </div>
      </footer>
    </div>
  );
}
