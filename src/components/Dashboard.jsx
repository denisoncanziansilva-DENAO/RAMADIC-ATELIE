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
  Calendar
} from 'lucide-react';

export default function Dashboard({ user, onLogout, onNavigate }) {
  const [activeTab, setActiveTab] = useState('todas');
  const [searchTerm, setSearchTerm] = useState('');

  // Lista simulada de OS vinculadas à bancada
  const [orders, setOrders] = useState([
    {
      id: '10429',
      cliente: 'Fernanda Oliveira',
      telefone: '(11) 99999-8888',
      peca: 'Calça Jeans Flare (Levi\'s 721)',
      reparos: ['Barra Original (4cm)', 'Ajuste de Cós (3cm)'],
      linha: 'Ocre / Amarelo Mostarda Original nº 36',
      tecido: 'Jeans 98% Algodão 2% Elastano',
      prazo: 'Amanhã às 16:00',
      prioridade: 'NORMAL',
      status: 'EM_COSTURA',
      statusLabel: 'Em Costura na Bancada',
      valorTotal: 80.0,
      sinalPago: 40.0,
      saldo: 40.0,
      costureiro: user?.apelido_bancada || 'Cadu',
      fotoUrl: '/hero-atelier.jpg',
      avarias: 'Sem avarias. Marcado 4cm de dobra com salto 5cm.'
    },
    {
      id: '10430',
      cliente: 'Roberto Mendes',
      telefone: '(11) 98888-7777',
      peca: 'Camisa Social Oxford',
      reparos: ['Encurtar Mangas com Punho (2cm)', 'Ajustar Costas'],
      linha: 'Azul Marinho Pesponto Fino',
      tecido: 'Algodão Egípcio 100%',
      prazo: 'Em 2 dias',
      prioridade: 'NORMAL',
      status: 'AGUARDANDO_CORTE',
      statusLabel: 'Aguardando Corte',
      valorTotal: 95.0,
      sinalPago: 50.0,
      saldo: 45.0,
      costureiro: user?.apelido_bancada || 'Cadu',
      fotoUrl: null,
      avarias: 'Botão do punho esquerdo solto na chegada.'
    },
    {
      id: '10431',
      cliente: 'Juliana Costa',
      telefone: '(11) 97777-6666',
      peca: 'Vestido de Festa Longo Madrinha',
      reparos: ['Ajuste de Busto e Decote', 'Barra Fina com Cauda'],
      linha: 'Rosa Chá Invisível',
      tecido: 'Crepe Georgette com Forro de Seda',
      prazo: 'Em 4 dias',
      prioridade: 'URGENTE_24H',
      status: 'PRONTO_PARA_RETIRADA',
      statusLabel: 'Pronto para Retirada',
      valorTotal: 170.0,
      sinalPago: 170.0,
      saldo: 0.0,
      costureiro: 'Dona Helena',
      fotoUrl: null,
      avarias: 'Sem avarias. Peça delicada com forro duplo.'
    }
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

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      {/* 1. TOPBAR DO DASHBOARD */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-3 text-left hover:opacity-90 transition cursor-pointer"
            >
              <img 
                src="/logo-ramadic.jpg" 
                alt="Ramadic Ateliê" 
                className="w-14 h-14 rounded-2xl object-contain border border-amber-200 bg-white p-0.5 shadow-sm"
              />
              <div>
                <span className="text-base font-extrabold tracking-tight text-slate-900 block leading-tight">
                  Ramadic Ateliê
                </span>
                <span className="text-[11px] text-amber-800 font-bold uppercase tracking-wider">
                  Bancada de Costura & OS
                </span>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200/80">
              <div className="w-8 h-8 rounded-full bg-amber-800 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                {user?.nome ? user.nome.charAt(0).toUpperCase() : 'P'}
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-slate-900 block leading-tight">
                  {user?.apelido_bancada || user?.nome || 'Profissional'}
                </span>
                <span className="text-[10px] text-amber-800 font-semibold">
                  {user?.cargo || 'Costureira(o) Especialista'}
                </span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('landing')}
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
            >
              Ver Site Público
            </button>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200/60 rounded-xl transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. CONTEÚDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        
        {/* Boas-vindas & Métricas */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Olá, {user?.apelido_bancada || user?.nome}!</span>
              <span className="text-lg">🧵</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Acompanhe as Ordens de Serviço ativas na sua bancada hoje.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => alert('Abrindo formulário de abertura de nova OS digital no balcão...')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold shadow-md shadow-amber-900/10 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Nova OS no Balcão</span>
            </button>
          </div>
        </div>

        {/* Cards de Métricas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Scissors className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-medium text-slate-500 block">Em Costura</span>
              <span className="text-2xl font-extrabold text-slate-900">
                {orders.filter(o => o.status === 'EM_COSTURA').length} peças
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-medium text-slate-500 block">Aguardando Corte</span>
              <span className="text-2xl font-extrabold text-slate-900">
                {orders.filter(o => o.status === 'AGUARDANDO_CORTE').length} peças
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-medium text-slate-500 block">Prontas p/ Retirada</span>
              <span className="text-2xl font-extrabold text-slate-900">
                {orders.filter(o => o.status === 'PRONTO_PARA_RETIRADA').length} peças
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-800 text-white flex items-center justify-center shrink-0 shadow-md">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-medium text-slate-500 block">Comissão Estimada</span>
              <span className="text-2xl font-extrabold text-slate-900">R$ 51,00</span>
            </div>
          </div>
        </div>

        {/* 3. LISTAGEM DE ORDENS DE SERVIÇO & FICHA TÉCNICA */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          
          {/* Header da Tabela com Filtros */}
          <div className="p-5 sm:p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'todas', label: 'Todas as Peças' },
                { id: 'em_costura', label: 'Em Costura' },
                { id: 'aguardando', label: 'Aguardando Corte' },
                { id: 'prontas', label: 'Prontas' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative max-w-xs w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="w-3.5 h-3.5" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por OS, cliente ou peça..."
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-700/40"
              />
            </div>

          </div>

          {/* Tabela de OS */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">OS / Cliente</th>
                  <th className="py-3.5 px-4">Peça & Reparos</th>
                  <th className="py-3.5 px-4">Linha / Pesponto</th>
                  <th className="py-3.5 px-4">Prazo</th>
                  <th className="py-3.5 px-4">Status Atual</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Ação</th>
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
                      <div className="text-slate-800 font-medium max-w-xs">{order.linha}</div>
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
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {order.statusLabel}
                      </span>
                    </td>

                    <td className="py-4 px-4 sm:px-6 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Ficha Técnica</span>
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </main>

      {/* 4. MODAL DETALHADO DE FICHA TÉCNICA OPERACIONAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
            
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
                Avançar Etapa de Produção:
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleUpdateStatus(selectedOrder.id, 'AGUARDANDO_CORTE', 'Aguardando Corte')}
                  className={`py-2 px-3 rounded-xl font-bold text-xs transition cursor-pointer border ${
                    selectedOrder.status === 'AGUARDANDO_CORTE'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  1. Corte / Preparo
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedOrder.id, 'EM_COSTURA', 'Em Costura na Bancada')}
                  className={`py-2 px-3 rounded-xl font-bold text-xs transition cursor-pointer border ${
                    selectedOrder.status === 'EM_COSTURA'
                      ? 'bg-amber-800 text-white border-amber-800 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  2. Em Costura
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedOrder.id, 'PRONTO_PARA_RETIRADA', 'Pronto para Retirada')}
                  className={`py-2 px-3 rounded-xl font-bold text-xs transition cursor-pointer border ${
                    selectedOrder.status === 'PRONTO_PARA_RETIRADA'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  3. Pronto / Passado
                </button>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4 flex justify-between items-center text-xs">
              <div>
                <span className="text-slate-500">Saldo a receber na retirada: </span>
                <span className="font-extrabold text-slate-900 text-sm">
                  R$ {selectedOrder.saldo.toFixed(2)}
                </span>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition cursor-pointer"
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
