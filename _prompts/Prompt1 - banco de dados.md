# Prompt 1 — Base do projeto + Neon completo (Ramadic Ateliê)

Você vai criar o banco de dados para um sistema de gestão para **Alfaiataria & Ateliê de Costura (Ramadic Ateliê - Mestre do Ajuste)**. Você tem acesso ao Neon via MCP e o projeto já foi criado com o nome de "RAMADIC ATELIE". Então pode e deve criar toda a estrutura diretamente via MCP, sem necessidade de copiar SQL manualmente.

Crie as seguintes tabelas com todos os campos e tipos abaixo:

---

## 1. Tabela `alfaiataria` (Tenancy / Ateliê)
- `id` (uuid, primary key, gerado automaticamente via `uuid_generate_v4()`)
- `nome` (text, not null) — Ex: "Ramadic Entre Linhas - Ateliê de Costura"
- `email` (text, not null, unique)
- `telefone` (text)
- `cnpj_cpf` (text)
- `endereco` (text)
- `created_at` (timestamp with time zone, default `now()`)

---

## 2. Tabela `profissionais` (Costureiros(as) & Atendentes)
- `id` (uuid, primary key, gerado automaticamente)
- `alfaiataria_id` (uuid, foreign key → `alfaiataria.id`, not null)
- `nome` (text, not null)
- `apelido_bancada` (text) — Ex: "Dona Helena", "Cadu"
- `telefone` (text)
- `especialidades` (text array) — Ex: `['ALFAIATARIA', 'VESTIDO_FESTA', 'BARRA_ORIGINAL', 'ZIPER']`
- `percentual_comissao` (numeric(5,2), default 0.00)
- `ativo` (boolean, default true)
- `created_at` (timestamp with time zone, default `now()`)

---

## 3. Tabela `clientes`
- `id` (uuid, primary key, gerado automaticamente)
- `alfaiataria_id` (uuid, foreign key → `alfaiataria.id`, not null)
- `nome` (text, not null)
- `cpf` (text)
- `telefone` (text)
- `whatsapp` (text, not null)
- `email` (text)
- `data_nascimento` (date)
- `endereco_rua` (text)
- `endereco_numero` (text)
- `endereco_complemento` (text)
- `endereco_bairro` (text)
- `endereco_cidade` (text)
- `endereco_uf` (text)
- `endereco_cep` (text)
- `notificacoes_whatsapp` (boolean, default true)
- `observacoes` (text)
- `created_at` (timestamp with time zone, default `now()`)

---

## 4. Tabela `servicos_catalogo`
- `id` (uuid, primary key, gerado automaticamente)
- `alfaiataria_id` (uuid, foreign key → `alfaiataria.id`, not null)
- `categoria` (text, not null) — Ex: `'calca'`, `'camisa'`, `'vestido'`, `'paleto'`
- `nome_servico` (text, not null) — Ex: `'Barra Original'`, `'Ajustar Cintura / Gancho'`, `'Ajuste de Busto e Decote'`
- `preco_base_sugerido` (numeric(10,2), not null)
- `prazo_padrao_horas` (integer, default 48)
- `ativo` (boolean, default true)
- `created_at` (timestamp with time zone, default `now()`)

---

## 5. Tabela `ordens_servico`
- `id` (uuid, primary key, gerado automaticamente)
- `alfaiataria_id` (uuid, foreign key → `alfaiataria.id`, not null)
- `numero_os` (serial, unique) — Número legível para cliente/etiqueta (ex: 10429)
- `cliente_id` (uuid, foreign key → `clientes.id`, not null)
- `atendente_id` (uuid, foreign key → `profissionais.id`)
- `prioridade` (text, default `'NORMAL'`) — `'NORMAL'`, `'EXPRESS_4H'`, `'URGENTE_24H'`
- `status_geral` (text, default `'RECEBIDO_PROVA'`) — `'RECEBIDO_PROVA'`, `'AGUARDANDO_CORTE'`, `'EM_COSTURA'`, `'EM_ACABAMENTO'`, `'PRONTO_PARA_RETIRADA'`, `'ENTREGUE'`, `'GARANTIA_REAJUSTE'`, `'CANCELADO'`
- `status_financeiro` (text, default `'PENDENTE'`) — `'PENDENTE'`, `'SINAL_PAGO'`, `'QUITADO'`, `'ESTORNADO'`
- `data_entrada` (timestamp with time zone, default `now()`)
- `data_prevista_entrega` (timestamp with time zone, not null)
- `data_conclusao_producao` (timestamp with time zone)
- `data_entrega_cliente` (timestamp with time zone)
- `valor_total_servicos` (numeric(10,2), default 0.00)
- `valor_taxa_urgencia` (numeric(10,2), default 0.00)
- `valor_desconto` (numeric(10,2), default 0.00)
- `valor_total_liquido` (numeric(10,2), default 0.00)
- `valor_sinal_pago` (numeric(10,2), default 0.00)
- `saldo_devedor_retirada` (numeric(10,2), default 0.00)
- `observacoes_balcao` (text)
- `termo_garantia_aceito` (boolean, default true)
- `created_at` (timestamp with time zone, default `now()`)

---

## 6. Tabela `itens_os` (Ficha Técnica Cirúrgica & Medidas da Peça)
- `id` (uuid, primary key, gerado automaticamente)
- `ordem_servico_id` (uuid, foreign key → `ordens_servico.id` on delete cascade, not null)
- `servico_catalogo_id` (uuid, foreign key → `servicos_catalogo.id`)
- `costureiro_executor_id` (uuid, foreign key → `profissionais.id`)
- `tipo_peca` (text, not null) — Ex: `'Calça Jeans Skinny'`, `'Vestido de Festa Longo'`, `'Camisa Social'`
- `marca_etiqueta` (text) — Ex: `'Levi''s'`, `'Zara'`, `'Dudalina'`
- `cor_tecido` (text, not null)
- `tipo_tecido` (text, not null) — Ex: `'Jeans com Elastano'`, `'Seda Pura'`, `'Sarja'`, `'Alfaiataria Super 120'`
- `cor_linha_pesponto` (text) — Ex: `'Ocre / Amarelo Original nº 36'`, `'Preta Invisível'`
- `tipo_bainha_barra` (text) — Ex: `'Barra Original com dobra preservada'`, `'Invisível à Mão'`, `'Galoneira'`
- `altura_barra_cm` (numeric(4,1)) — Ex: `4.0` (cm para encurtar)
- `ajuste_cintura_cm` (numeric(4,1)) — Ex: `3.0` (cm para ajustar cós/gancho)
- `ajuste_manga_cm` (numeric(4,1))
- `ajuste_busto_decote_cm` (numeric(4,1))
- `medidas_adicionais` (jsonb) — Demais medições customizadas
- `avarias_previas` (text) — Vistoria de entrada: marcas, desfiados ou botões faltantes para segurança jurídica
- `peca_com_forro` (boolean, default false)
- `peca_com_pedrarias` (boolean, default false)
- `status_item` (text, default `'RECEBIDO_PROVA'`)
- `valor_unitario` (numeric(10,2), not null)
- `comissao_calculada` (numeric(10,2), default 0.00)
- `observacao_tecnica_costureiro` (text)
- `created_at` (timestamp with time zone, default `now()`)

---

## 7. Tabela `fotos_os` (Registro Fotográfico da Prova com Giz & Alfinetes)
- `id` (uuid, primary key, gerado automaticamente)
- `ordem_servico_id` (uuid, foreign key → `ordens_servico.id` on delete cascade, not null)
- `item_os_id` (uuid, foreign key → `itens_os.id` on delete cascade)
- `tipo_foto` (text, not null) — `'PROVA_GIZ_ALFINETE'`, `'AVARIA_ENTRADA'`, `'FINAL_PASSADA'`
- `url_arquivo` (text, not null)
- `descricao_foto` (text)
- `created_at` (timestamp with time zone, default `now()`)

---

## 8. Tabela `pagamentos_os` (Sinal de Balcão e Saldo de Retirada)
- `id` (uuid, primary key, gerado automaticamente)
- `ordem_servico_id` (uuid, foreign key → `ordens_servico.id` on delete cascade, not null)
- `tipo_transacao` (text, not null) — `'SINAL_ENTRADA'`, `'SALDO_RETIRADA'`, `'PAGAMENTO_INTEGRAL'`, `'ESTORNO'`
- `forma` (text, not null) — `'PIX'`, `'CARTAO_CREDITO'`, `'CARTAO_DEBITO'`, `'DINHEIRO'`, `'LINK_PAGAMENTO'`
- `valor_pago` (numeric(10,2), not null)
- `comprovante_transacao_id` (text)
- `recebido_por_id` (uuid, foreign key → `profissionais.id`)
- `observacao` (text)
- `created_at` (timestamp with time zone, default `now()`)

---

## 9. Tabela `historico_status_os` (Linha do Tempo e Rastreio da OS)
- `id` (uuid, primary key, gerado automaticamente)
- `ordem_servico_id` (uuid, foreign key → `ordens_servico.id` on delete cascade, not null)
- `status_anterior` (text)
- `status_novo` (text, not null)
- `alterado_por_id` (uuid, foreign key → `profissionais.id`)
- `descricao_evento` (text)
- `created_at` (timestamp with time zone, default `now()`)

---

### 🔒 Segurança & Políticas RLS (Row Level Security)
Após criar todas as tabelas e relacionamentos, ative o **Row Level Security (RLS)** em todas as tabelas para garantir que cada alfaiataria/ateliê acesse apenas os seus próprios dados. Configure as policies necessárias vinculadas ao `auth.uid()` / Neon Auth.

Por fim, confirme que tudo foi criado corretamente listando as tabelas e seus campos.