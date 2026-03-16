
-- Create role enum
CREATE TYPE public.user_role AS ENUM ('admin', 'leitor');

-- Create profiles table
CREATE TABLE public.perfis (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT NOT NULL DEFAULT '',
  tipo user_role NOT NULL DEFAULT 'leitor',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.perfis ENABLE ROW LEVEL SECURITY;

-- Create books table
CREATE TABLE public.livros (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  autor TEXT NOT NULL,
  isbn TEXT UNIQUE,
  categoria TEXT NOT NULL DEFAULT 'Geral',
  estoque_total INTEGER NOT NULL DEFAULT 0 CHECK (estoque_total >= 0),
  estoque_disponivel INTEGER NOT NULL DEFAULT 0 CHECK (estoque_disponivel >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.livros ENABLE ROW LEVEL SECURITY;

-- Create loans table
CREATE TABLE public.emprestimos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  livro_id UUID NOT NULL REFERENCES public.livros(id) ON DELETE CASCADE,
  usuario_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  data_saida TIMESTAMPTZ NOT NULL DEFAULT now(),
  data_devolucao_prevista TIMESTAMPTZ NOT NULL,
  data_devolucao_real TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'devolvido')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.emprestimos ENABLE ROW LEVEL SECURITY;

-- Create reservations table
CREATE TABLE public.reservas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  livro_id UUID NOT NULL REFERENCES public.livros(id) ON DELETE CASCADE,
  usuario_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  data_reserva TIMESTAMPTZ NOT NULL DEFAULT now(),
  ativa BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.reservas ENABLE ROW LEVEL SECURITY;

-- Security definer function to check admin
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.perfis
    WHERE id = _user_id AND tipo = 'admin'
  )
$$;

-- RLS Policies for perfis
CREATE POLICY "Users can view own profile" ON public.perfis
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.perfis
  FOR SELECT USING (public.is_admin(auth.uid()));
CREATE POLICY "Users can update own profile" ON public.perfis
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.perfis
  FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Admins can update any profile" ON public.perfis
  FOR UPDATE USING (public.is_admin(auth.uid()));

-- RLS Policies for livros
CREATE POLICY "Anyone can view books" ON public.livros
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can insert books" ON public.livros
  FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update books" ON public.livros
  FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete books" ON public.livros
  FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- RLS Policies for emprestimos
CREATE POLICY "Users can view own loans" ON public.emprestimos
  FOR SELECT USING (auth.uid() = usuario_id);
CREATE POLICY "Admins can view all loans" ON public.emprestimos
  FOR SELECT USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can insert loans" ON public.emprestimos
  FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update loans" ON public.emprestimos
  FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));

-- RLS Policies for reservas
CREATE POLICY "Users can view own reservations" ON public.reservas
  FOR SELECT USING (auth.uid() = usuario_id);
CREATE POLICY "Admins can view all reservations" ON public.reservas
  FOR SELECT USING (public.is_admin(auth.uid()));
CREATE POLICY "Users can insert own reservations" ON public.reservas
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = usuario_id);
CREATE POLICY "Users can update own reservations" ON public.reservas
  FOR UPDATE TO authenticated USING (auth.uid() = usuario_id);

-- Trigger: auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.perfis (id, nome, tipo)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'nome', NEW.email), 'leitor');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger: decrease stock when loan created
CREATE OR REPLACE FUNCTION public.handle_loan_created()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.livros
  SET estoque_disponivel = estoque_disponivel - 1, updated_at = now()
  WHERE id = NEW.livro_id AND estoque_disponivel > 0;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Livro sem estoque disponível';
  END IF;
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_loan_created
  AFTER INSERT ON public.emprestimos
  FOR EACH ROW EXECUTE FUNCTION public.handle_loan_created();

-- Trigger: increase stock when loan returned
CREATE OR REPLACE FUNCTION public.handle_loan_returned()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.status = 'devolvido' AND OLD.status = 'pendente' THEN
    UPDATE public.livros
    SET estoque_disponivel = estoque_disponivel + 1, updated_at = now()
    WHERE id = NEW.livro_id;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_loan_returned
  AFTER UPDATE ON public.emprestimos
  FOR EACH ROW EXECUTE FUNCTION public.handle_loan_returned();

-- Updated_at trigger for livros
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_livros_updated_at
  BEFORE UPDATE ON public.livros
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
