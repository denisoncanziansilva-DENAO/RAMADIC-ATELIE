import React, { useState } from 'react';
import { 
  Scissors, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  Star, 
  Phone, 
  MapPin, 
  Search, 
  ArrowRight, 
  ShieldCheck, 
  Calendar, 
  MessageCircle,
  X
} from 'lucide-react';

export default function LandingPageCostura() {
  // Estado para o simulador de preços
  const [selectedPiece, setSelectedPiece] = useState('calca');
  const [selectedService, setSelectedService] = useState('barra');
  const [trackingOS, setTrackingOS] = useState('');
  const [osResult, setOsResult] = useState(null);

  // Base de dados do simulador
  const pricingData = {
    calca: {
      label: 'Calça Jeans / Sarja',
      services: [
        { id: 'barra', name: 'Barra Original', price: 'R$ 28 - R$ 38', time: '24 a 48h' },
        { id: 'apertar', name: 'Ajustar Cintura / Gancho', price: 'R$ 35 - R$ 55', time: '48 a 72h' },
        { id: 'ziper', name: 'Troca de Zíper Reforçado', price: 'R$ 30 - R$ 42', time: '24 a 48h' }
      ]
    },
    camisa: {
      label: 'Camisa Social',
      services: [
        { id: 'manga', name: 'Encurtar Mangas com Punho', price: 'R$ 40 - R$ 60', time: '48h' },
        { id: 'corpo', name: 'Ajustar Laterais e Costas', price: 'R$ 35 - R$ 50', time: '48h' },
        { id: 'colarinho', name: 'Virar / Ajustar Colarinho', price: 'R$ 30 - R$ 45', time: '3 dias' }
      ]
    },
    vestido: {
      label: 'Vestido de Festa',
      services: [
        { id: 'busto', name: 'Ajuste de Busto e Decote', price: 'R$ 60 - R$ 120', time: '5 a 7 dias' },
        { id: 'barra_festa', name: 'Barra em Tecido Fino / Cauda', price: 'R$ 50 - R$ 110', time: '3 a 5 dias' },
        { id: 'fecho', name: 'Zíper Invisível / Forro', price: 'R$ 40 - R$ 65', time: '48 a 72h' }
      ]
    },
    paleto: {
      label: 'Terno / Paletó',
      services: [
        { id: 'manga_alf', name: 'Ajuste de Manga de Alfaiataria', price: 'R$ 70 - R$ 130', time: '4 a 6 dias' },
        { id: 'ombro', name: 'Ajustar Ombreira e Costas', price: 'R$ 90 - R$ 180', time: '5 a 7 dias' }
      ]
    }
  };

  const currentServices = pricingData[selectedPiece]?.services || [];
  const currentEstimate = currentServices.find(s => s.id === selectedService) || currentServices[0];

  const handleOSSearch = (e) => {
    e.preventDefault();
    if (!trackingOS.trim()) return;
    setOsResult({
      code: trackingOS.trim(),
      client: 'Cliente Exemplo',
      status: 'Em Bancada de Costura Técnica',
      stage: 'Etapa 3 de 4 (Costura com linha de fábrica)',
      estimatedDate: 'Amanhã às 16:00'
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      {/* 1. TOPO / AVISO SUPERIOR */}
      <div className="bg-amber-700 text-amber-50 px-4 py-2 text-xs md:text-sm font-medium text-center flex items-center justify-center gap-2 shadow-sm">
        <Sparkles className="w-4 h-4 text-amber-200 animate-pulse shrink-0" />
        <span>Precisa para hoje? Oferecemos atendimento Express em barras e zíperes em até 4 horas.</span>
      </div>

      {/* 2. HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <img 
              src="/logo-ramadic.jpg" 
              alt="Ramadic Entre Linhas - Ateliê de Costura" 
              className="w-12 h-12 rounded-2xl object-cover shadow-md border border-amber-200/80 ring-2 ring-amber-700/15 transition-transform hover:scale-105"
            />
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 block leading-tight">Ramadic</span>
              <span className="text-[11px] text-amber-800 tracking-wider uppercase font-bold">Entre Linhas • Ateliê de Costura</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#servicos" className="hover:text-amber-800 transition">Serviços</a>
            <a href="#como-funciona" className="hover:text-amber-800 transition">Como Funciona</a>
            <a href="#simulador" className="hover:text-amber-800 transition">Simulador de Valores</a>
            <a href="#faq" className="hover:text-amber-800 transition">Dúvidas</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#rastreio"
              className="hidden lg:flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
            >
              <Search className="w-3.5 h-3.5" />
              Rastrear OS
            </a>
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg text-white bg-amber-800 hover:bg-amber-900 transition shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Agendar Prova</span>
            </a>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-white to-slate-100/60 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 border border-amber-200 text-amber-900 text-xs font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-600 text-amber-600" />
                <span>Nota 4.9 ★ com mais de 15.000 peças ajustadas</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Suas roupas com o <span className="text-amber-800 underline decoration-amber-400 decoration-wavy underline-offset-8">caimento exato</span> no seu corpo.
              </h1>

              <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal">
                Da barra com linha original ao ajuste fino de alfaiataria e vestidos de festa. Precisão em cada pesponto, respeito ao tecido de fábrica e garantia de reajuste sem custo.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center lg:justify-start">
                <a
                  href="#simulador"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-semibold text-sm shadow-lg shadow-amber-900/15 transition-all hover:translate-y-[-1px]"
                >
                  Simular Orçamento Rápido
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-sm shadow-sm transition"
                >
                  <Calendar className="w-4 h-4 text-amber-700" />
                  Agendar Prova no Balcão
                </a>
              </div>

              {/* Benefícios rápidos */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200/80 max-w-xl mx-auto lg:mx-0">
                <div className="text-left">
                  <div className="text-xl font-bold text-slate-900">24-48h</div>
                  <div className="text-xs text-slate-500 font-medium">Prazo médio de entrega</div>
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold text-slate-900">100%</div>
                  <div className="text-xs text-slate-500 font-medium">Garantia de reajuste</div>
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold text-slate-900">Original</div>
                  <div className="text-xs text-slate-500 font-medium">Linha e ponto de fábrica</div>
                </div>
              </div>
            </div>

            {/* Comparativo Visual / Destaque */}
            <div className="lg:col-span-5 relative">
              <div className="bg-white p-4 rounded-3xl shadow-2xl border border-slate-200/90 space-y-4 relative group">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </div>
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">Padrão de Ateliê de Luxo</span>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/60">Inspeção em 4 etapas</span>
                </div>

                <div className="relative rounded-2xl overflow-hidden aspect-4/3 shadow-inner bg-slate-900">
                  <img
                    src="/hero-atelier.jpg"
                    alt="Marcação de alfaiate com giz e alfinete no Ramadic Ateliê"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-4">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-900/90 backdrop-blur-md text-amber-100 text-[11px] font-semibold w-fit mb-1 border border-amber-700/40">
                      <Scissors className="w-3 h-3 text-amber-300 rotate-45" />
                      Marcação Milimétrica na Prova
                    </div>
                    <p className="text-white text-xs font-medium leading-snug drop-shadow">
                      Cada detalhe em giz e alfinete é registrado e anexado à sua OS digital com foto.
                    </p>
                  </div>
                </div>

                <div className="bg-amber-50/80 p-3.5 rounded-2xl border border-amber-200/80 flex items-center gap-3 shadow-xs">
                  <ShieldCheck className="w-5 h-5 text-amber-800 shrink-0" />
                  <p className="text-xs text-amber-950 leading-relaxed font-medium">
                    <strong className="text-amber-900 font-bold">Garantia de 30 dias:</strong> se a roupa precisar de ajuste adicional após provar em casa, refazemos de graça.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CATÁLOGO DE SERVIÇOS */}
      <section id="servicos" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs uppercase tracking-widest font-bold text-amber-800 mb-2">Especialidades</h2>
            <p className="text-3xl font-bold text-slate-900 tracking-tight">O que consertamos e ajustamos com excelência</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Barras & Bainhas',
                desc: 'Original dobrada, pespontada, desfiada, invisível à mão ou galoneira.',
                badge: 'A partir de 24h',
                tags: ['Jeans', 'Alfaiataria', 'Vestidos']
              },
              {
                title: 'Ajuste de Alfaiataria',
                desc: 'Mangas, acinturamento de paletó, ombros e ajuste fino de calças sociais.',
                badge: 'Especialista',
                tags: ['Ternos', 'Blazers', 'Camisas']
              },
              {
                title: 'Vestidos de Festa & Noiva',
                desc: 'Redução de cintura, barras finas com cauda, ajuste de alças e rendas.',
                badge: 'Alta Costura',
                tags: ['Madrinhas', 'Formandas', 'Gala']
              },
              {
                title: 'Troca de Zíperes & Botões',
                desc: 'Zíper invisível, dentes de metal reforçado para jaquetas e aplicação de botões.',
                badge: 'Rápido',
                tags: ['Jaquetas', 'Saias', 'Bolsas']
              },
              {
                title: 'Ajuste de Gancho & Cós',
                desc: 'Eliminação da sobra traseira no cós da calça jeans sem perder as presilhas.',
                badge: 'Mais pedido',
                tags: ['Jeans', 'Bermudas', 'Linho']
              },
              {
                title: 'Customização & Upcycling',
                desc: 'Transforme calças em bermudas, reduza peças oversized e renove seu guarda-roupa.',
                badge: 'Sustentável',
                tags: ['Corte', 'Tingimento', 'Patchwork']
              }
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-700/40 hover:shadow-md transition group">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700">
                    {item.badge}
                  </span>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-amber-800 transition group-hover:translate-x-1" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">{item.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((t, i) => (
                    <span key={i} className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-200/60 text-slate-700">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. COMO FUNCIONA (PASSO A PASSO) */}
      <section id="como-funciona" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest font-bold text-amber-400 mb-2">Transparência Total</h2>
            <p className="text-3xl font-bold tracking-tight">Como funciona a sua experiência</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Prova no Balcão',
                desc: 'Você veste a peça no provador. Nossa profissional marca os ajustes exatos com alfinetes e giz de alfaiate.'
              },
              {
                step: '02',
                title: 'OS Digital com Foto',
                desc: 'Registramos a peça demarcada por foto no balcão para evitar qualquer desentendimento. Você recebe o link no WhatsApp.'
              },
              {
                step: '03',
                title: 'Costura Técnica',
                desc: 'Costureiras especializadas trabalham na peça usando agulhas e linhas compatíveis com a gramatura do seu tecido.'
              },
              {
                step: '04',
                title: 'Aviso & Prova Final',
                desc: 'Avisamos por WhatsApp com a peça passada e ensacada. Você pode provar novamente antes de levar para casa.'
              }
            ].map((p, i) => (
              <div key={i} className="relative p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                <div className="text-3xl font-extrabold text-amber-400/80 mb-3 font-mono">{p.step}</div>
                <h3 className="text-lg font-bold text-slate-100 mb-2">{p.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SIMULADOR DE VALORES E PRAZOS (INTERATIVO) */}
      <section id="simulador" className="py-20 bg-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xs uppercase tracking-widest font-bold text-amber-800 mb-2">Simulador Interativo</h2>
            <p className="text-3xl font-bold text-slate-900 tracking-tight">Estime o valor e o prazo do seu conserto</p>
            <p className="text-sm text-slate-500 mt-2">Valores estimados médios. A confirmação final ocorre na medição presencial.</p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Seletores */}
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    1. Selecione o Tipo de Roupa
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.keys(pricingData).map((key) => (
                      <button
                        key={key}
                        onClick={() => {
                          setSelectedPiece(key);
                          setSelectedService(pricingData[key].services[0].id);
                        }}
                        className={`text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                          selectedPiece === key
                            ? 'bg-amber-800 text-white border-amber-800 shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {pricingData[key].label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    2. Escolha o Reparo Desejado
                  </label>
                  <div className="space-y-2">
                    {currentServices.map((srv) => (
                      <button
                        key={srv.id}
                        onClick={() => setSelectedService(srv.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold border flex items-center justify-between transition cursor-pointer ${
                          selectedService === srv.id
                            ? 'bg-amber-50 border-amber-700 text-amber-900'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{srv.name}</span>
                        {selectedService === srv.id && <CheckCircle2 className="w-4 h-4 text-amber-800" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Box de Resultado */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Estimativa Preliminar
                  </div>

                  <div>
                    <span className="text-xs text-slate-500 block">Investimento Médio</span>
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                      {currentEstimate.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-600 text-xs pt-2">
                    <Clock className="w-4 h-4 text-amber-700" />
                    <span>Tempo previsto: <strong>{currentEstimate.time}</strong></span>
                  </div>

                  <div className="border-t border-slate-200 pt-4 text-xs text-slate-500 leading-relaxed">
                    * Tecidos com forro, seda pura, veludo ou pedrarias delicadas podem exigir avaliação técnica adicional na bancada.
                  </div>
                </div>

                <a
                  href={`https://wa.me/5511999999999?text=Olá!%20Simulei%20no%20site%20o%20ajuste%20de%20${encodeURIComponent(currentEstimate.name)}%20para%20uma%20peça.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full mt-6 py-3.5 px-4 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold text-center flex items-center justify-center gap-2 shadow-md shadow-amber-900/10 transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  Confirmar Disponibilidade no WhatsApp
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 7. CONSULTA RÁPIDA DE OS / RASTREIO */}
      <section id="rastreio" className="py-12 bg-white border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-lg font-bold text-slate-900 mb-1">Já tem uma peça conosco?</h3>
          <p className="text-xs text-slate-500 mb-6">Consulte o andamento da sua Ordem de Serviço em tempo real</p>
          
          <form onSubmit={handleOSSearch} className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
            <input
              type="text"
              placeholder="Digite o número da OS (ex: 10429)"
              value={trackingOS}
              onChange={(e) => setTrackingOS(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700/50"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition cursor-pointer"
            >
              Consultar
            </button>
          </form>

          {osResult && (
            <div className="mt-6 p-4 rounded-2xl bg-amber-50/70 border border-amber-200 max-w-md mx-auto text-left relative animate-in fade-in slide-in-from-top-2 duration-300">
              <button 
                onClick={() => setOsResult(null)}
                className="absolute top-3 right-3 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2 mb-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                OS #{osResult.code} Encontrada
              </div>
              <div className="text-sm font-semibold text-slate-900">{osResult.status}</div>
              <div className="text-xs text-slate-600 mt-1">{osResult.stage}</div>
              <div className="text-xs text-slate-500 mt-2 pt-2 border-t border-amber-200/60 flex justify-between">
                <span>Previsão de retirada:</span>
                <span className="font-semibold text-slate-800">{osResult.estimatedDate}</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 8. PERGUNTAS FREQUENTES (FAQ) */}
      <section id="faq" className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xs uppercase tracking-widest font-bold text-amber-800 mb-2">Tire suas Dúvidas</h2>
            <p className="text-3xl font-bold text-slate-900 tracking-tight">Perguntas mais comuns</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Preciso levar o sapato que vou usar com a roupa?',
                a: 'Sim, fortemente recomendado! Principalmente para barras de calça social, macacões e vestidos longos de festa. A altura do calçado define com precisão os milímetros da dobra.'
              },
              {
                q: 'Vocês realizam serviços no mesmo dia?',
                a: 'Sim. Dispomos do serviço Express para barras de jeans tradicionais e trocas comuns de fecho/zíper, entregues em até 4 horas (consulte taxa de urgência no balcão).'
              },
              {
                q: 'E se a peça não ficar confortável após eu provar em casa?',
                a: 'Oferecemos garantia de 30 dias após a retirada. Se algo apertar ou sobrar, trazemos de volta para a bancada sem nenhuma cobrança complementar.'
              },
              {
                q: 'As peças ficam com a linha e a costura idêntica à de fábrica?',
                a: 'Trabalhamos com linhas de alta tenacidade e mantemos o padrão de pesponto, espessura e tonalidade idênticos ao padrão original da marca da sua roupa.'
              }
            ].map((faq, i) => (
              <div key={i} className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                <h4 className="text-sm font-bold text-slate-900 mb-2">{faq.q}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. RODAPÉ */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            <div className="space-y-3">
              <div className="flex items-center gap-3.5 text-white">
                <img 
                  src="/logo-ramadic.jpg" 
                  alt="Ramadic Entre Linhas - Ateliê de Costura" 
                  className="w-12 h-12 rounded-2xl object-cover shadow-lg border border-amber-400/40 ring-2 ring-amber-400/20"
                />
                <div>
                  <span className="text-lg font-extrabold tracking-tight block text-white">Ramadic</span>
                  <span className="text-[11px] text-amber-400 tracking-wider uppercase font-semibold">Entre Linhas • Ateliê de Costura</span>
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Ateliê moderno de costura, ajustes finos de alfaiataria e reparos têxteis com agilidade e compromisso técnico.
              </p>
            </div>

            <div>
              <h5 className="font-bold text-slate-200 uppercase tracking-wider mb-3">Atendimento & Local</h5>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Av. Principal, 1200 - Sala 04, Centro</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>(11) 99999-9999 / (11) 3333-3333</span>
                </div>
                <div className="text-slate-500 pt-1">Seg a Sex: 08h às 19h | Sáb: 09h às 14h</div>
              </div>
            </div>

            <div>
              <h5 className="font-bold text-slate-200 uppercase tracking-wider mb-3">Acesso Rápido</h5>
              <ul className="space-y-2">
                <li><a href="#servicos" className="hover:text-amber-400 transition">Tabela de Serviços</a></li>
                <li><a href="#simulador" className="hover:text-amber-400 transition">Calcular Prazo e Preço</a></li>
                <li><a href="#rastreio" className="hover:text-amber-400 transition">Acompanhar Minha OS</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-slate-200 uppercase tracking-wider mb-3">Compromisso</h5>
              <p className="text-slate-400 leading-relaxed mb-2">
                Retenção máxima de peças prontas: até 90 dias com seguro contra extravio na loja.
              </p>
              <span className="inline-block px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-amber-400 font-mono text-[11px]">
                Ambiente 100% Climatizado & Provadores Amplos
              </span>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
            <div>© {new Date().getFullYear()} Ramadic Ateliê - Mestre do Ajuste. Todos os direitos reservados.</div>
            <div className="flex gap-4">
              <span className="hover:underline cursor-pointer">Termos de Serviço</span>
              <span className="hover:underline cursor-pointer">Política de Privacidade</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
