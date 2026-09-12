import React, { useState } from 'react';
import { 
  Scissors, 
  Clock, 
  CheckCircle2, 
  Package, 
  LogOut, 
  Plus, 
  Search, 
  Sparkles, 
  User, 
  DollarSign, 
  Eye, 
  AlertCircle,
  TrendingUp,
  ArrowUpRight,
  Filter,
  Check,
  Calendar,
  LayoutDashboard,
  ClipboardList,
  Ruler,
  Users,
  Tag,
  Phone,
  MessageCircle,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  SlidersHorizontal,
  Home,
  Menu,
  X
} from 'lucide-react';

export default function Dashboard({ user, onLogout, onNavigate }) {
  const [currentSection, setCurrentSection] = useState('bancada'); // 'bancada' | 'os' | 'fichas' | 'clientes' | 'servicos'
  const [activeTab, setActiveTab] = useState('todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lista de Ordens de Serviço em Bancada
  const [orders, setOrders] = useState([
    {
      id: '10429',
      cliente: 'Fernanda Oliveira',
      telefone: '(11) 99999-8888',
      peca: 'Calça Jeans Flare (Levi\'s 721)',
      reparos: ['Barra Original (4.0cm)', 'Ajuste de Cós (3.0cm)'],
      linha: 'Ocre / Amarelo Mostarda Original nº 36',
      tecido: 'Jeans 98% Algodão 2% Elastano',
      prazo: 'Amanhã às 16:00',
      diasRestantes: 1,
      prioridade: 'NORMAL',
      status: 'EM_COSTURA',
      statusLabel: 'Em Costura na Bancada',
      valorTotal: 80.0,
      sinalPago: 40.0,
      saldo: 40.0,
      costureiro: user?.apelido_bancada || 'Cadu',
      fotoUrl: '/hero-atelier.jpg',
      avarias: 'Sem avarias prévias. Medido 4cm de dobra no provador com calçado de salto 5cm.',
      medidas: { barra: '4.0 cm', cos: '3.0 cm na lombar' }
    },
    {
      id: '10430',
      cliente: 'Roberto Mendes',
      telefone: '(11) 98888-7777',
      peca: 'Camisa Social Oxford',
      reparos: ['Encurtar Mangas com Punho (2.5cm)', 'Ajustar Costas'],
      linha: 'Azul Marinho Pesponto Fino',
      tecido: 'Algodão Egípcio 100%',
      prazo: 'Em 2 dias',
      diasRestantes: 2,
      prioridade: 'NORMAL',
      status: 'AGUARDANDO_CORTE',
      statusLabel: 'Aguardando Corte',
      valorTotal: 95.0,
      sinalPago: 50.0,
      saldo: 45.0,
      costureiro: user?.apelido_bancada || 'Cadu',
      fotoUrl: null,
      avarias: 'Botão do punho esquerdo solto na chegada.',
      medidas: { manga: '2.5 cm', costas: '1.5 cm cada lado' }
    },
    {
      id: '10431',
      cliente: 'Juliana Costa',
      telefone: '(11) 97777-6666',
      peca: 'Vestido de Festa Longo Madrinha',
      reparos: ['Ajuste de Busto e Decote', 'Barra Fina com Cauda'],
      linha: 'Rosa Chá Invisível',
      tecido: 'Crepe Georgette com Forro de Seda',
      prazo: 'Hoje às 18:00',
      diasRestantes: 0,
      prioridade: 'URGENTE_24H',
      status: 'PRONTO_PARA_RETIRADA',
      statusLabel: 'Pronto para Retirada',
      valorTotal: 170.0,
      sinalPago: 170.0,
      saldo: 0.0,
      costureiro: 'Dona Helena',
      fotoUrl: null,
      avarias: 'Sem avarias. Peça delicada com forro duplo.',
      medidas: { busto: '2.0 cm', barra: 'Cauda alinhada ao salto' }
    }
  ]);

  // Lista de Clientes
  const [clients] = useState([
    {
      id: '1',
      nome: 'Fernanda Oliveira',
      whatsapp: '(11) 99999-8888',
      email: 'fernanda.oliveira@email.com',
      totalPecas: 8,
      preferencia: 'Prefere pesponto ocre original nas calças jeans',
      ultimaVisita: 'Ontem'
    },
    {
      id: '2',
      nome: 'Roberto Mendes',
      whatsapp: '(11) 98888-7777',
      email: 'roberto.mendes@email.com',
      totalPecas: 5,
      preferencia: 'Ajustes finos em camisas sociais sob medida',
      ultimaVisita: 'Há 3 dias'
    },
    {
      id: '3',
      nome: 'Juliana Costa',
      whatsapp: '(11) 97777-6666',
      email: 'juliana.costa@email.com',
      totalPecas: 12,
      preferencia: 'Vestidos de festa e tecidos nobres (seda e linho)',
      ultimaVisita: 'Há 5 dias'
    }
  ]);

  // Tabela de Preços do Catálogo
  const [servicesCatalog] = useState([
    { categoria: 'Calça Jeans / Sarja', servico: 'Barra Original', preco: 'R$ 28 - R$ 38', prazo: '24 a 48h' },
    { categoria: 'Calça Jeans / Sarja', servico: 'Ajustar Cintura / Gancho', preco: 'R$ 35 - R$ 55', prazo: '48 a 72h' },
    { categoria: 'Calça Jeans / Sarja', servico: 'Troca de Zíper Reforçado', preco: 'R$ 30 - R$ 42', prazo: '24 a 48h' },
    { categoria: 'Camisa Social', servico: 'Encurtar Mangas com Punho', preco: 'R$ 40 - R$ 60', prazo: '48h' },
    { categoria: 'Camisa Social', servico: 'Ajustar Laterais e Costas', preco: 'R$ 35 - R$ 50', prazo: '48h' },
    { categoria: 'Camisa Social', servico: 'Virar / Ajustar Colarinho', preco: 'R$ 30 - R$ 45', prazo: '3 dias' },
    { categoria: 'Vestido de Festa', servico: 'Ajuste de Busto e Decote', preco: 'R$ 60 - R$ 120', prazo: '5 a 7 dias' },
    { categoria: 'Vestido de Festa', servico: 'Barra em Tecido Fino / Cauda', preco: 'R$ 50 - R$ 110', prazo: '3 a 5 dias' },
    { categoria: 'Vestido de Festa', servico: 'Zíper Invisível / Forro', preco: 'R$ 40 - R$ 65', prazo: '48 a 72h' },
    { categoria: 'Terno / Paletó', servico: 'Ajuste de Manga de Alfaiataria', preco: 'R$ 70 - R$ 130', prazo: '4 a 6 dias' },
    { categoria: 'Terno / Paletó', servico: 'Ajustar Ombreira e Costas', preco: 'R$ 90 - R$ 180', prazo: '5 a 7 dias' }
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleUpdateStatus = (orderId, newStatus, newLabel) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status: newStatus, statusLabel: newLabel } : o
      )
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => ({ ...prev, status: newStatus, statusLabel: newLabel }));
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchSearch =
      o.id.includes(searchTerm) ||
      o.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.peca.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === 'todas') return matchSearch;
    if (activeTab === 'em_costura') return matchSearch && o.status === 'EM_COSTURA';
    if (activeTab === 'aguardando') return matchSearch && o.status === 'AGUARDANDO_CORTE';
    if (activeTab === 'prontas') return matchSearch && o.status === 'PRONTO_PARA_RETIRADA';
    return matchSearch;
  });

  const menuItems = [
    { id: 'bancada', label: 'Minha Bancada', icon: LayoutDashboard, badge: orders.filter(o => o.status === 'EM_COSTURA').length },
    { id: 'os', label: 'Ordens de Serviço (OS)', icon: ClipboardList, badge: orders.length },
    { id: 'fichas', label: 'Ficha Técnica & Provas', icon: Ruler },
    { id: 'clientes', label: 'Clientes & Medidas', icon: Users, badge: clients.length },
    { id: 'servicos', label: 'Tabela de Serviços', icon: Tag }
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col md:flex-row font-sans">
      
      {/* ========================================================================= */}
      {/* 1. SIDEBAR FIXA LATERAL COM LOGO 3X */}
      {/* ========================================================================= */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-slate-950 text-slate-300 flex flex-col justify-between border-r border-slate-800 shadow-2xl transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          
          {/* Topo do Menu com Logotipo 3x */}
          <div className="p-6 border-b border-slate-800/80 flex flex-col items-center text-center relative bg-gradient-to-b from-slate-900 to-slate-950">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <img 
              src="/logo-ramadic.jpg" 
              alt="Ramadic Entre Linhas" 
              className="w-28 h-28 rounded-3xl object-contain shadow-2xl border-2 border-amber-400/40 ring-4 ring-amber-400/20 bg-white p-1 mb-3 transition-transform hover:scale-105"
            />
            <h2 className="text-lg font-extrabold text-white tracking-tight">Ramadic</h2>
            <span className="text-[10px] text-amber-400 tracking-wider uppercase font-bold">
              Entre Linhas • Ateliê de Costura
            </span>
          </div>

          {/* Links de Navegação */}
          <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 py-1">
              Menu Operacional
            </div>

            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition cursor-pointer ${
                    isActive
                      ? 'bg-amber-800 text-white shadow-lg shadow-amber-900/30'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-amber-200' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      isActive ? 'bg-amber-950/60 text-amber-200' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-4 border-t border-slate-800/80 mt-4">
              <button
                onClick={() => onNavigate('landing')}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900 transition cursor-pointer"
              >
                <Home className="w-4 h-4 text-amber-500" />
                <span>Ver Site Público</span>
              </button>
            </div>
          </nav>

          {/* Rodapé da Sidebar com Usuário Conectado */}
          <div className="p-4 border-t border-slate-800/80 bg-slate-900/60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-800 text-white flex items-center justify-center font-bold text-xs shadow">
                  {user?.nome ? user.nome.charAt(0).toUpperCase() : 'C'}
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-white block leading-tight">
                    {user?.apelido_bancada || user?.nome || 'Profissional'}
                  </span>
                  <span className="text-[10px] text-amber-400 font-medium block">
                    {user?.cargo || 'Costureiro(a) de Bancada'}
                  </span>
                </div>
              </div>

              <button
                onClick={onLogout}
                title="Sair do Sistema"
                className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-slate-800 transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </aside>

      {/* Overlay Mobile */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs md:hidden"
        />
      )}

      {/* ========================================================================= */}
      {/* 2. ÁREA PRINCIPAL DO DASHBOARD (COM MARGEM DA SIDEBAR) */}
      {/* ========================================================================= */}
      <div className="flex-1 md:ml-72 flex flex-col min-h-screen">
        
        {/* Top Header Mobile / Tablet */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <span>
                  {currentSection === 'bancada' && 'Painel da Minha Bancada'}
                  {currentSection === 'os' && 'Ordens de Serviço (OS)'}
                  {currentSection === 'fichas' && 'Fichas Técnicas & Marcação de Prova'}
                  {currentSection === 'clientes' && 'Gestão de Clientes & Medidas'}
                  {currentSection === 'servicos' && 'Catálogo Oficial de Serviços & Preços'}
                </span>
              </h1>
              <span className="text-xs text-slate-500 hidden sm:block">
                Ramadic Entre Linhas • Gestão Operacional em Tempo Real
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => alert('Abrindo formulário de cadastro de nova OS no balcão...')}
              className="inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold shadow-md shadow-amber-900/10 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Nova OS no Balcão</span>
              <span className="sm:hidden">Nova OS</span>
            </button>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* 3. CONTEÚDO ESPECÍFICO POR SEÇÃO */}
        {/* ========================================================================= */}
        <main className="p-4 sm:p-8 space-y-8 flex-1">
          
          {/* ===================================================================== */}
          {/* SEÇÃO 1: MINHA BANCADA / DASHBOARD PRINCIPAL */}
          {/* ===================================================================== */}
          {currentSection === 'bancada' && (
            <>
              {/* 4 Cards de Métricas Principais (Prompt 3) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Card 1: Peças em Costura */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between hover:shadow-md transition">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Peças em Costura
                    </span>
                    <span className="text-3xl font-extrabold text-slate-900">
                      {orders.filter(o => o.status === 'EM_COSTURA').length}
                    </span>
                    <span className="text-[11px] text-amber-800 font-semibold block mt-1 flex items-center gap-1">
                      <Scissors className="w-3 h-3" />
                      Em máquina na bancada
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <Scissors className="w-6 h-6" />
                  </div>
                </div>

                {/* Card 2: Prazos da Semana */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between hover:shadow-md transition">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Prazos da Semana
                    </span>
                    <span className="text-3xl font-extrabold text-slate-900">
                      {orders.length}
                    </span>
                    <span className="text-[11px] text-red-700 font-bold block mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      1 peça para hoje (Urgente)
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                    <Calendar className="w-6 h-6" />
                  </div>
                </div>

                {/* Card 3: Prontas para Retirada */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between hover:shadow-md transition">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Prontas p/ Retirada
                    </span>
                    <span className="text-3xl font-extrabold text-slate-900">
                      {orders.filter(o => o.status === 'PRONTO_PARA_RETIRADA').length}
                    </span>
                    <span className="text-[11px] text-emerald-700 font-semibold block mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Passadas & Ensacadas
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <Package className="w-6 h-6" />
                  </div>
                </div>

                {/* Card 4: Comissão Estimada */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between hover:shadow-md transition">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Comissão Estimada
                    </span>
                    <span className="text-3xl font-extrabold text-slate-900">
                      R$ 51,00
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium block mt-1 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-emerald-600" />
                      Taxa de 15% por peça
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-800 text-white flex items-center justify-center shrink-0 shadow-md">
                    <DollarSign className="w-6 h-6" />
                  </div>
                </div>

              </div>

              {/* Box de Peças Prontas & Aviso no WhatsApp (Card 3 detalhado) */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-800" />
                      Peças Prontas Aguardando Retirada no Balcão
                    </h3>
                    <p className="text-xs text-slate-600">
                      Avise os clientes com 1 clique no WhatsApp para retirar no ateliê.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold w-fit">
                    1 cliente com peça disponível
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {orders.filter(o => o.status === 'PRONTO_PARA_RETIRADA').map(order => (
                    <div key={order.id} className="bg-white p-4 rounded-2xl border border-amber-200/90 shadow-sm flex flex-col justify-between space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-slate-900 text-sm">OS #{order.id}</span>
                            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 text-[10px] font-bold">
                              Pronto
                            </span>
                          </div>
                          <div className="font-bold text-slate-800 text-xs mt-1">{order.cliente}</div>
                          <div className="text-xs text-slate-500">{order.peca}</div>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 block uppercase">Saldo</span>
                          <span className="font-extrabold text-slate-900 text-sm">
                            {order.saldo > 0 ? `R$ ${order.saldo.toFixed(2)}` : 'Quitado'}
                          </span>
                        </div>
                      </div>

                      <a
                        href={`https://wa.me/5511977776666?text=Olá%20${encodeURIComponent(order.cliente)}!%20Sua%20peça%20(${encodeURIComponent(order.peca)})%20está%20pronta%20e%20passada%20aqui%20no%20Ramadic%20Ateliê.%20Pode%20retirar%20no%20nosso%20balcão!`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-xs cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Avisar Cliente no WhatsApp</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tabela de Ordens de Serviço */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-5 sm:p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">
                      Ordens de Serviço em Andamento
                    </h3>
                    <p className="text-xs text-slate-500">
                      Gerencie e avance as peças na esteira de costura.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {[
                      { id: 'todas', label: 'Todas' },
                      { id: 'em_costura', label: 'Em Costura' },
                      { id: 'aguardando', label: 'Aguardando Corte' },
                      { id: 'prontas', label: 'Prontas' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                          activeTab === tab.id
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="py-3.5 px-4 sm:px-6">OS / Cliente</th>
                        <th className="py-3.5 px-4">Peça & Reparos</th>
                        <th className="py-3.5 px-4">Linha / Pesponto</th>
                        <th className="py-3.5 px-4">Prazo</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 sm:px-6 text-right">Ficha Técnica</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-amber-50/40 transition">
                          
                          <td className="py-4 px-4 sm:px-6">
                            <div className="font-extrabold text-slate-900 text-sm">#{order.id}</div>
                            <div className="font-medium text-slate-700">{order.cliente}</div>
                            <div className="text-[11px] text-slate-400">{order.telefone}</div>
                          </td>

                          <td className="py-4 px-4">
                            <div className="font-bold text-slate-800">{order.peca}</div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {order.reparos.map((rep, i) => (
                                <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[10px]">
                                  {rep}
                                </span>
                              ))}
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            <div className="text-slate-800 font-semibold">{order.linha}</div>
                            <div className="text-[10px] text-slate-500">{order.tecido}</div>
                          </td>

                          <td className="py-4 px-4">
                            <div className="font-semibold text-slate-900">{order.prazo}</div>
                            <span className={`inline-block text-[10px] font-bold px-1.5 py-0.5 rounded mt-0.5 ${
                              order.prioridade === 'URGENTE_24H'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-slate-100 text-slate-600'
                            }`}>
                              {order.prioridade}
                            </span>
                          </td>

                          <td className="py-4 px-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                              order.status === 'EM_COSTURA'
                                ? 'bg-amber-100 text-amber-900'
                                : order.status === 'PRONTO_PARA_RETIRADA'
                                ? 'bg-emerald-100 text-emerald-900'
                                : 'bg-blue-100 text-blue-900'
                            }`}>
                              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                              {order.statusLabel}
                            </span>
                          </td>

                          <td className="py-4 px-4 sm:px-6 text-right">
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer shadow-xs"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Ver Ficha</span>
                            </button>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* ===================================================================== */}
          {/* SEÇÃO 2: ORDENS DE SERVIÇO (OS) COMPLETA */}
          {/* ===================================================================== */}
          {currentSection === 'os' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar por número de OS, cliente ou peça..."
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-700/40 focus:outline-none"
                  />
                </div>
                <div className="flex gap-2">
                  <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-2 rounded-xl flex items-center gap-1.5">
                    <ClipboardList className="w-4 h-4 text-amber-800" />
                    Total: {orders.length} Ordens Cadastradas
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 hover:border-amber-700/40 transition">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-extrabold text-slate-900">OS #{order.id}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          order.status === 'EM_COSTURA'
                            ? 'bg-amber-100 text-amber-900'
                            : order.status === 'PRONTO_PARA_RETIRADA'
                            ? 'bg-emerald-100 text-emerald-900'
                            : 'bg-blue-100 text-blue-900'
                        }`}>
                          {order.statusLabel}
                        </span>
                      </div>

                      <div className="text-sm font-bold text-slate-800 mb-1">{order.cliente}</div>
                      <div className="text-xs text-slate-600 mb-3">{order.peca}</div>

                      <div className="space-y-1 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <div><strong>Linha:</strong> {order.linha}</div>
                        <div><strong>Prazo:</strong> {order.prazo}</div>
                        <div><strong>Investimento:</strong> R$ {order.valorTotal.toFixed(2)}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Abrir Ficha Técnica Completa</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* SEÇÃO 3: FICHAS TÉCNICAS & MEDIÇÃO DE PROVA */}
          {/* ===================================================================== */}
          {currentSection === 'fichas' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  Galeria de Fichas Técnicas & Marcações de Giz
                </h3>
                <p className="text-xs text-slate-500">
                  Registros fotográficos tirados no balcão com os alfinetes e marcações da prova presencial.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-amber-800 uppercase">OS #10429</span>
                      <h4 className="text-base font-extrabold text-slate-900">Calça Jeans Flare Levi's</h4>
                      <span className="text-xs text-slate-500">Cliente: Fernanda Oliveira</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
                      Com Foto Digital
                    </span>
                  </div>

                  <div className="relative rounded-2xl overflow-hidden aspect-4/3 shadow-inner bg-slate-900">
                    <img
                      src="/hero-atelier.jpg"
                      alt="Marcação de alfaiate"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white text-xs">
                      <div className="font-bold flex items-center gap-1">
                        <Scissors className="w-3.5 h-3.5 text-amber-300 rotate-45" />
                        Marcação de 4.0cm de Barra Original
                      </div>
                      <span className="text-[11px] text-slate-300">Medido na prova com salto de 5cm</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Linha Pesponto</span>
                      <span className="font-bold text-slate-800">Ocre nº 36 Original</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Ajuste de Cós</span>
                      <span className="font-bold text-slate-800">3.0 cm na lombar</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-amber-800 uppercase">Padrão de Qualidade do Ateliê</span>
                    <h4 className="text-base font-extrabold text-slate-900">Procedimento de Vistoria de Entrada</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Todas as peças passam por triagem detalhada no provador: marcação em giz de alfaiate, contagem de botões, inspeção de forro e verificação de manchas prévias.
                    </p>

                    <div className="space-y-2 pt-2">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-amber-50 p-3 rounded-xl border border-amber-200">
                        <ShieldCheck className="w-4 h-4 text-amber-800 shrink-0" />
                        <span>Garantia de 30 dias para reajuste gratuito</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Linhas de alta tenacidade compatíveis com a marca original</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => alert('Abrindo câmera para fotografar peça no balcão...')}
                    className="w-full py-3 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Fotografar e Anexar Nova Peça</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* SEÇÃO 4: CLIENTES & HISTÓRICO */}
          {/* ===================================================================== */}
          {currentSection === 'clientes' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Carteira de Clientes do Ateliê</h3>
                  <p className="text-xs text-slate-500">Histórico de ajustes e preferências têxteis.</p>
                </div>
                <button
                  onClick={() => alert('Abrindo cadastro de novo cliente...')}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Cadastrar Cliente</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {clients.map((client) => (
                  <div key={client.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-base mb-3 shadow-xs">
                        {client.nome.charAt(0)}
                      </div>
                      <h4 className="text-base font-extrabold text-slate-900">{client.nome}</h4>
                      <span className="text-xs text-slate-500 block mb-3">{client.whatsapp}</span>

                      <div className="space-y-2 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Peças Ajustadas:</span>
                          <span className="font-bold text-slate-900">{client.totalPecas} peças</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Preferência:</span>
                          <span className="text-slate-700 font-medium">{client.preferencia}</span>
                        </div>
                      </div>
                    </div>

                    <a
                      href={`https://wa.me/55${client.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Conversar no WhatsApp</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* SEÇÃO 5: TABELA DE SERVIÇOS & PREÇOS */}
          {/* ===================================================================== */}
          {currentSection === 'servicos' && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <h3 className="text-lg font-bold text-slate-900">Catálogo Oficial de Serviços & Prazos</h3>
                <p className="text-xs text-slate-500">Tabela de referência para orçamentos e atendimentos no balcão.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-6">Categoria</th>
                      <th className="py-3.5 px-6">Serviço Técnico</th>
                      <th className="py-3.5 px-6">Valor Estimado</th>
                      <th className="py-3.5 px-6">Prazo Médio</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {servicesCatalog.map((srv, idx) => (
                      <tr key={idx} className="hover:bg-amber-50/30 transition">
                        <td className="py-3.5 px-6 font-bold text-amber-900">{srv.categoria}</td>
                        <td className="py-3.5 px-6 font-semibold text-slate-800">{srv.servico}</td>
                        <td className="py-3.5 px-6 font-extrabold text-slate-900">{srv.preco}</td>
                        <td className="py-3.5 px-6">
                          <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-bold text-[11px]">
                            {srv.prazo}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>

      </div>

      {/* ========================================================================= */}
      {/* 4. MODAL DETALHADO DE FICHA TÉCNICA CIRÚRGICA (Prompt 3) */}
      {/* ========================================================================= */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[92vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-bold text-amber-800 uppercase tracking-widest">
                  Ficha Técnica Cirúrgica
                </span>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Ordem de Serviço #{selectedOrder.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Foto e Detalhes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Registro de Prova em Balcão
                </div>
                {selectedOrder.fotoUrl ? (
                  <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-4/3 relative shadow-inner">
                    <img
                      src={selectedOrder.fotoUrl}
                      alt="Marcação de alfaiate"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 right-2 bg-slate-900/80 backdrop-blur-xs p-2 rounded-xl text-[10px] text-white">
                      Marcação em giz e alfinete na prova presencial
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl bg-slate-100 aspect-4/3 flex items-center justify-center p-4 text-center border border-dashed border-slate-300 text-xs text-slate-400">
                    Nenhuma foto anexada
                  </div>
                )}
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 font-bold uppercase block text-[10px]">Cliente</span>
                  <span className="text-sm font-bold text-slate-900">{selectedOrder.cliente}</span>
                  <span className="text-slate-500 block">{selectedOrder.telefone}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-bold uppercase block text-[10px]">Peça & Tecido</span>
                  <span className="font-semibold text-slate-800">{selectedOrder.peca}</span>
                  <span className="text-slate-500 block">{selectedOrder.tecido}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-bold uppercase block text-[10px]">Linha de Pesponto</span>
                  <span className="font-semibold text-amber-900">{selectedOrder.linha}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-bold uppercase block text-[10px]">Vistoria / Avarias de Entrada</span>
                  <p className="text-slate-600 bg-amber-50 p-2.5 rounded-xl border border-amber-200/80 leading-relaxed font-medium">
                    {selectedOrder.avarias}
                  </p>
                </div>
              </div>
            </div>

            {/* Controle de Etapas */}
            <div className="border-t border-slate-200 pt-4">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-3">
                Avançar Etapa de Produção na Bancada:
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleUpdateStatus(selectedOrder.id, 'AGUARDANDO_CORTE', 'Aguardando Corte')}
                  className={`py-2.5 px-3 rounded-xl font-bold text-xs transition cursor-pointer border ${
                    selectedOrder.status === 'AGUARDANDO_CORTE'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  1. Corte / Preparo
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedOrder.id, 'EM_COSTURA', 'Em Costura na Bancada')}
                  className={`py-2.5 px-3 rounded-xl font-bold text-xs transition cursor-pointer border ${
                    selectedOrder.status === 'EM_COSTURA'
                      ? 'bg-amber-800 text-white border-amber-800 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  2. Em Costura
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedOrder.id, 'PRONTO_PARA_RETIRADA', 'Pronto para Retirada')}
                  className={`py-2.5 px-3 rounded-xl font-bold text-xs transition cursor-pointer border ${
                    selectedOrder.status === 'PRONTO_PARA_RETIRADA'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  3. Pronto / Passado
                </button>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
              <div>
                <span className="text-slate-500">Saldo a receber na retirada: </span>
                <span className="font-extrabold text-slate-900 text-sm">
                  R$ {selectedOrder.saldo.toFixed(2)}
                </span>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition cursor-pointer"
              >
                Concluir Visualização
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
