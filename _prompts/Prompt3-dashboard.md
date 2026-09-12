# Prompt 3 — Dashboard Operacional da Bancada (Ramadic Ateliê)

Agora vamos criar o dashboard principal do sistema. Essa é a primeira tela que a profissional/costureira ou atendente vê após fazer login no **Ramadic Entre Linhas - Ateliê de Costura**.

---

## 1. Layout & Navegação
- **Menu Lateral Fixo (Sidebar)** com:
  - Logotipo oficial **"Ramadic Entre Linhas - Ateliê de Costura"** (3x de destaque no topo)
  - Links de navegação:
    - 🧵 **Dashboard / Minha Bancada** (Visão geral de produção)
    - 📋 **Ordens de Serviço (OS)** (Lista completa e controle de status)
    - 📐 **Ficha Técnica & Provas** (Medições em cm, tipo de linha e fotos de marcação)
    - 👥 **Clientes & Histórico** (Cadastro, telefones e histórico de peças ajustadas)
    - 🏷️ **Tabela de Serviços** (Preços base e prazos do catálogo)
  - Identificação do profissional conectado no rodapé do menu (nome, apelido de bancada, foto/avatar e botão de Sair/Logout).

---

## 2. Cards de Informação & Métricas em Tempo Real
O dashboard deve exibir 4 cards principais de desempenho da bancada:

### Card 1 — Peças em Costura na Bancada
- Exibe o número total de peças atualmente na máquina ou bancada do profissional logado (`status = 'EM_COSTURA'`).

### Card 2 — Prazos da Semana (Entregas Previstas)
- Exibe o número de Ordens de Serviço com data prometida para os próximos 7 dias, com destaque para peças com atendimento `URGENTE_24H` ou `EXPRESS_4H`.

### Card 3 — Prontas para Retirada & Saldos Pendentes
- Exibe a quantidade de peças já finalizadas e passadas aguardando retirada pelo cliente no balcão (`status = 'PRONTO_PARA_RETIRADA'`).
- Lista rápida dos clientes com peças prontas, saldo devedor restante e botão com link direto para **Avisar no WhatsApp** com mensagem pronta.

### Card 4 — Estimativa de Comissão da Costureira
- Exibe o total acumulado de comissão calculada com base na porcentagem cadastrada do profissional (ex: 15% ou 20%) para as peças executadas no mês.

---

## 3. Tabela Operacional de Ordens de Serviço (OS)
- Tabela dinâmica com filtros rápidos por status (*Todas as Peças*, *Aguardando Corte*, *Em Costura*, *Prontas para Retirada*).
- Campo de busca em tempo real por número da OS (ex: #10429), nome do cliente ou tipo de peça.
- Colunas informativas:
  - **OS / Cliente** (Número sequencial, nome e WhatsApp)
  - **Peça & Reparos** (Ex: *Calça Jeans Flare Levi's — Barra Original 4cm + Ajuste de Cós 3cm*)
  - **Linha de Pesponto & Tecido** (Ex: *Ocre nº 36 original em Jeans com elastano*)
  - **Prazo & Prioridade** (Data/Hora de entrega com badge visual de urgência)
  - **Status Atual** com indicador de pulso colorido
  - **Ação**: Botão para abrir o **Modal de Ficha Técnica Cirúrgica**

---

## 4. Modal de Ficha Técnica Cirúrgica da Peça
Ao clicar em uma OS, abrir modal com:
- **Foto de Balcão**: Imagem da peça com marcação em giz e alfinete registrada na prova.
- **Detalhamento Técnico**: Tipo de tecido, linha original, bainha, medidas exatas em cm.
- **Mapeamento de Avarias Prévias**: Registro de vistoria de entrada (segurança do ateliê).
- **Avanço de Etapas de Produção**: Botões com 1 clique para transicionar o status (`Aguardando Corte` ➔ `Em Costura` ➔ `Pronto / Passado`).
- **Resumo Financeiro**: Valor total, sinal pago no balcão e saldo devedor na retirada.

---

## 5. Regras de Negócio & Segurança
- Carregar dados em tempo real vinculados ao projeto **RAMADIC ATELIE** no Neon (`noisy-recipe-60002631`).
- Respeitar o isolamento por `alfaiataria_id` e exibir os itens atribuídos à bancada da costureira conectada.
- Se não houver peças com prazo atrasado ou sem retirada, exibir mensagem positiva (ex: *"Todas as peças prontas foram retiradas pelos clientes!"*).

---

## 6. Design & Identidade Visual
- Seguir a identidade acolhedora e sofisticada do **Ramadic Ateliê**:
- **Cores**: Âmbar, dourado, terracota, ardósia escuro e branco.
- Ícones nítidos e contextuais via `lucide-react`.
- Interface 100% responsiva para tablets e computadores na bancada de costura.