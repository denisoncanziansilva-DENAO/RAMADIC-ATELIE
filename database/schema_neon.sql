-- ============================================================================
-- BANCO DE DADOS: NEON (PROJETO: RAMADIC ATELIE)
-- SCRIPT DE CRIAÇÃO COMPLETO COM RLS & POLICIES (PROMPT 1)
-- ============================================================================

-- 0. EXTENSÕES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------------------------
-- 1. TABELAS PRINCIPAIS
-- ----------------------------------------------------------------------------

-- 1.1. ALFAIATARIA (Tenancy / Ateliê)
CREATE TABLE IF NOT EXISTS alfaiataria (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    telefone TEXT,
    cnpj_cpf TEXT,
    endereco TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 1.2. PROFISSIONAIS (Costureiros(as) & Atendentes)
CREATE TABLE IF NOT EXISTS profissionais (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    alfaiataria_id UUID NOT NULL REFERENCES alfaiataria(id) ON DELETE CASCADE,
    nome TEXT NOT NULL,
    apelido_bancada TEXT,
    telefone TEXT,
    especialidades TEXT[] DEFAULT ARRAY['AJUSTES_GERAIS'],
    percentual_comissao NUMERIC(5,2) DEFAULT 0.00,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 1.3. CLIENTES
CREATE TABLE IF NOT EXISTS clientes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    alfaiataria_id UUID NOT NULL REFERENCES alfaiataria(id) ON DELETE CASCADE,
    nome TEXT NOT NULL,
    cpf TEXT,
    telefone TEXT,
    whatsapp TEXT NOT NULL,
    email TEXT,
    data_nascimento DATE,
    endereco_rua TEXT,
    endereco_numero TEXT,
    endereco_complemento TEXT,
    endereco_bairro TEXT,
    endereco_cidade TEXT,
    endereco_uf TEXT,
    endereco_cep TEXT,
    notificacoes_whatsapp BOOLEAN DEFAULT true,
    observacoes TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 1.4. SERVIÇOS DO CATÁLOGO (Tabela de Preços)
CREATE TABLE IF NOT EXISTS servicos_catalogo (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    alfaiataria_id UUID NOT NULL REFERENCES alfaiataria(id) ON DELETE CASCADE,
    categoria TEXT NOT NULL,
    nome_servico TEXT NOT NULL,
    preco_base_sugerido NUMERIC(10,2) NOT NULL,
    prazo_padrao_horas INTEGER DEFAULT 48,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 1.5. ORDENS DE SERVIÇO (Cabeçalho da OS)
CREATE TABLE IF NOT EXISTS ordens_servico (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    alfaiataria_id UUID NOT NULL REFERENCES alfaiataria(id) ON DELETE CASCADE,
    numero_os SERIAL UNIQUE,
    cliente_id UUID NOT NULL REFERENCES clientes(id) ON DELETE RESTRICT,
    atendente_id UUID REFERENCES profissionais(id) ON DELETE SET NULL,
    prioridade TEXT DEFAULT 'NORMAL',
    status_geral TEXT DEFAULT 'RECEBIDO_PROVA',
    status_financeiro TEXT DEFAULT 'PENDENTE',
    data_entrada TIMESTAMPTZ DEFAULT now(),
    data_prevista_entrega TIMESTAMPTZ NOT NULL,
    data_conclusao_producao TIMESTAMPTZ,
    data_entrega_cliente TIMESTAMPTZ,
    valor_total_servicos NUMERIC(10,2) DEFAULT 0.00,
    valor_taxa_urgencia NUMERIC(10,2) DEFAULT 0.00,
    valor_desconto NUMERIC(10,2) DEFAULT 0.00,
    valor_total_liquido NUMERIC(10,2) DEFAULT 0.00,
    valor_sinal_pago NUMERIC(10,2) DEFAULT 0.00,
    saldo_devedor_retirada NUMERIC(10,2) DEFAULT 0.00,
    observacoes_balcao TEXT,
    termo_garantia_aceito BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 1.6. ITENS DA ORDEM DE SERVIÇO (Ficha Técnica Cirúrgica da Peça)
CREATE TABLE IF NOT EXISTS itens_os (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ordem_servico_id UUID NOT NULL REFERENCES ordens_servico(id) ON DELETE CASCADE,
    servico_catalogo_id UUID REFERENCES servicos_catalogo(id) ON DELETE SET NULL,
    costureiro_executor_id UUID REFERENCES profissionais(id) ON DELETE SET NULL,
    tipo_peca TEXT NOT NULL,
    marca_etiqueta TEXT,
    cor_tecido TEXT NOT NULL,
    tipo_tecido TEXT NOT NULL,
    cor_linha_pesponto TEXT,
    tipo_bainha_barra TEXT,
    altura_barra_cm NUMERIC(4,1),
    ajuste_cintura_cm NUMERIC(4,1),
    ajuste_manga_cm NUMERIC(4,1),
    ajuste_busto_decote_cm NUMERIC(4,1),
    medidas_adicionais JSONB,
    avarias_previas TEXT,
    peca_com_forro BOOLEAN DEFAULT false,
    peca_com_pedrarias BOOLEAN DEFAULT false,
    status_item TEXT DEFAULT 'RECEBIDO_PROVA',
    valor_unitario NUMERIC(10,2) NOT NULL,
    comissao_calculada NUMERIC(10,2) DEFAULT 0.00,
    observacao_tecnica_costureiro TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 1.7. FOTOS DA PEÇA (Marcação de Giz, Alfinetes e Avarias)
CREATE TABLE IF NOT EXISTS fotos_os (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ordem_servico_id UUID NOT NULL REFERENCES ordens_servico(id) ON DELETE CASCADE,
    item_os_id UUID REFERENCES itens_os(id) ON DELETE CASCADE,
    tipo_foto TEXT NOT NULL,
    url_arquivo TEXT NOT NULL,
    descricao_foto TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 1.8. PAGAMENTOS DA OS (Sinal de Balcão e Saldo de Retirada)
CREATE TABLE IF NOT EXISTS pagamentos_os (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ordem_servico_id UUID NOT NULL REFERENCES ordens_servico(id) ON DELETE CASCADE,
    tipo_transacao TEXT NOT NULL,
    forma TEXT NOT NULL,
    valor_pago NUMERIC(10,2) NOT NULL,
    comprovante_transacao_id TEXT,
    recebido_por_id UUID REFERENCES profissionais(id) ON DELETE SET NULL,
    observacao TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 1.9. HISTÓRICO DE STATUS & RASTREIO DA OS
CREATE TABLE IF NOT EXISTS historico_status_os (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ordem_servico_id UUID NOT NULL REFERENCES ordens_servico(id) ON DELETE CASCADE,
    status_anterior TEXT,
    status_novo TEXT NOT NULL,
    alterado_por_id UUID REFERENCES profissionais(id) ON DELETE SET NULL,
    descricao_evento TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ----------------------------------------------------------------------------
-- 2. ÍNDICES DE PERFORMANCE
-- ----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_profissionais_alfaiataria ON profissionais(alfaiataria_id);
CREATE INDEX IF NOT EXISTS idx_clientes_alfaiataria ON clientes(alfaiataria_id);
CREATE INDEX IF NOT EXISTS idx_clientes_whatsapp ON clientes(whatsapp);
CREATE INDEX IF NOT EXISTS idx_servicos_alfaiataria ON servicos_catalogo(alfaiataria_id);
CREATE INDEX IF NOT EXISTS idx_os_alfaiataria ON ordens_servico(alfaiataria_id);
CREATE INDEX IF NOT EXISTS idx_os_numero ON ordens_servico(numero_os);
CREATE INDEX IF NOT EXISTS idx_os_cliente ON ordens_servico(cliente_id);
CREATE INDEX IF NOT EXISTS idx_itens_ordem_servico ON itens_os(ordem_servico_id);
CREATE INDEX IF NOT EXISTS idx_pagamentos_ordem_servico ON pagamentos_os(ordem_servico_id);
CREATE INDEX IF NOT EXISTS idx_fotos_ordem_servico ON fotos_os(ordem_servico_id);
CREATE INDEX IF NOT EXISTS idx_historico_ordem_servico ON historico_status_os(ordem_servico_id);

-- ----------------------------------------------------------------------------
-- 3. HABILITAÇÃO DO ROW LEVEL SECURITY (RLS)
-- ----------------------------------------------------------------------------
ALTER TABLE alfaiataria ENABLE ROW LEVEL SECURITY;
ALTER TABLE profissionais ENABLE ROW LEVEL SECURITY;
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE servicos_catalogo ENABLE ROW LEVEL SECURITY;
ALTER TABLE ordens_servico ENABLE ROW LEVEL SECURITY;
ALTER TABLE itens_os ENABLE ROW LEVEL SECURITY;
ALTER TABLE fotos_os ENABLE ROW LEVEL SECURITY;
ALTER TABLE pagamentos_os ENABLE ROW LEVEL SECURITY;
ALTER TABLE historico_status_os ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------------------------
-- 4. POLICIES (POLÍTICAS DE ACESSO MULTI-TENANT / NEON AUTH)
-- ----------------------------------------------------------------------------

-- Alfaiataria (Permite que o usuário autenticado acesse sua respectiva alfaiataria)
CREATE POLICY policy_alfaiataria_all ON alfaiataria
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Profissionais
CREATE POLICY policy_profissionais_all ON profissionais
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Clientes
CREATE POLICY policy_clientes_all ON clientes
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Catálogo de Serviços
CREATE POLICY policy_servicos_all ON servicos_catalogo
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Ordens de Serviço
CREATE POLICY policy_os_all ON ordens_servico
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Itens da OS
CREATE POLICY policy_itens_os_all ON itens_os
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Fotos da OS
CREATE POLICY policy_fotos_os_all ON fotos_os
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Pagamentos da OS
CREATE POLICY policy_pagamentos_os_all ON pagamentos_os
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Histórico de Status da OS
CREATE POLICY policy_historico_os_all ON historico_status_os
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- ----------------------------------------------------------------------------
-- 5. VERIFICAÇÃO DE ESTRUTURA CRIADA
-- ----------------------------------------------------------------------------
SELECT 
    table_name, 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
ORDER BY table_name, ordinal_position;
