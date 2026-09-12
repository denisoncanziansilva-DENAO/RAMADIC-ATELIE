import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  User, 
  ArrowLeft, 
  AlertCircle, 
  CheckCircle2, 
  Scissors, 
  Sparkles,
  Tag,
  Eye,
  EyeOff
} from 'lucide-react';
import { authService } from '../services/authService';

const AVAILABLE_SPECIALTIES = [
  { id: 'ALFAIATARIA', label: 'Alfaiataria Fina' },
  { id: 'BARRA_ORIGINAL', label: 'Barra Original & Jeans' },
  { id: 'VESTIDO_FESTA', label: 'Vestidos de Festa' },
  { id: 'ZIPER', label: 'Troca de Zíperes' },
  { id: 'AJUSTE_GERAL', label: 'Ajustes Gerais & Bainhas' },
  { id: 'CUSTOMIZACAO', label: 'Customização & Upcycling' }
];

export default function Register({ onNavigate, onLoginSuccess }) {
  const [nome, setNome] = useState('');
  const [apelidoBancada, setApelidoBancada] = useState('');
  const [email, setEmail] = useState('');
  const [selectedSpecialties, setSelectedSpecialties] = useState(['BARRA_ORIGINAL']);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const toggleSpecialty = (id) => {
    if (selectedSpecialties.includes(id)) {
      if (selectedSpecialties.length > 1) {
        setSelectedSpecialties(selectedSpecialties.filter((s) => s !== id));
      }
    } else {
      setSelectedSpecialties([...selectedSpecialties, id]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!nome.trim() || !email.trim() || !password.trim()) {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem. Verifique e tente novamente.');
      return;
    }

    setLoading(true);
    try {
      const user = await authService.register({
        nome,
        apelido_bancada: apelidoBancada,
        email,
        password,
        especialidades: selectedSpecialties
      });
      onLoginSuccess(user);
    } catch (err) {
      setErrorMessage(err.message || 'Erro ao criar conta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/70 via-slate-50 to-orange-50/50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Botão Voltar */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
        <button
          onClick={() => onNavigate('login')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 shadow-sm hover:bg-slate-50 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-amber-800" />
          <span>Voltar ao Login</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-lg text-center">
        {/* Logo 3x em destaque */}
        <div className="flex justify-center mb-4">
          <img 
            src="/logo-ramadic.jpg" 
            alt="Ramadic Entre Linhas - Ateliê de Costura" 
            className="w-32 h-32 rounded-3xl object-contain shadow-xl border border-amber-200/90 ring-4 ring-amber-700/15 bg-white p-1.5 transition-transform hover:scale-105"
          />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Cadastro de Profissional
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 font-medium">
          Junte-se à equipe do Ramadic Entre Linhas
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-2xl rounded-3xl border border-slate-200/90 sm:px-10">
          
          {errorMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-800 text-xs animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Nome Completo *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Ex: Maria Santos"
                    className="block w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-700/40 focus:border-amber-700 transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Apelido de Bancada
                </label>
                <input
                  type="text"
                  value={apelidoBancada}
                  onChange={(e) => setApelidoBancada(e.target.value)}
                  placeholder="Ex: Dona Maria"
                  className="block w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-700/40 focus:border-amber-700 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                E-mail Profissional *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="maria@ramadicatelie.com.br"
                  className="block w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-700/40 focus:border-amber-700 transition"
                  required
                />
              </div>
            </div>

            {/* Especialidades */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Especialidades de Costura
              </label>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_SPECIALTIES.map((spec) => {
                  const isSelected = selectedSpecialties.includes(spec.id);
                  return (
                    <button
                      key={spec.id}
                      type="button"
                      onClick={() => toggleSpecialty(spec.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-amber-800 text-white border-amber-800 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      <span>{spec.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Senha (mín. 6 dígitos) *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-700/40 focus:border-amber-700 transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Confirmar Senha *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-700/40 focus:border-amber-700 transition"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-sm shadow-lg shadow-amber-900/15 transition-all hover:translate-y-[-1px] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Criando Cadastro...</span>
                  </>
                ) : (
                  <>
                    <Scissors className="w-4 h-4" />
                    <span>Criar Conta de Profissional</span>
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-xs text-slate-600 border-t border-slate-200/80 pt-4">
            Já faz parte da equipe?{' '}
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="text-amber-800 font-bold hover:underline cursor-pointer"
            >
              Faça login na sua bancada
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
