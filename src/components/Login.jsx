import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  ArrowLeft, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles,
  Scissors,
  Eye,
  EyeOff
} from 'lucide-react';
import { authService } from '../services/authService';

export default function Login({ onNavigate, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Por favor, preencha o e-mail e a senha.');
      return;
    }

    setLoading(true);
    try {
      const user = await authService.login(email, password, rememberMe);
      onLoginSuccess(user);
    } catch (err) {
      setErrorMessage(err.message || 'Erro ao realizar login.');
    } finally {
      setLoading(false);
    }
  };

  // Preenchimento rápido para testes
  const fillQuickLogin = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('senha123');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/70 via-slate-50 to-orange-50/50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Botão Voltar */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
        <button
          onClick={() => onNavigate('landing')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 shadow-sm hover:bg-slate-50 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-amber-800" />
          <span>Voltar ao Ateliê</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Logo 3x em destaque */}
        <div className="flex justify-center mb-4">
          <img 
            src="/logo-ramadic.jpg" 
            alt="Ramadic Entre Linhas - Ateliê de Costura" 
            className="w-32 h-32 rounded-3xl object-contain shadow-xl border border-amber-200/90 ring-4 ring-amber-700/15 bg-white p-1.5 transition-transform hover:scale-105"
          />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Acesso à Bancada
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 font-medium">
          Painel Operacional de Costura & Gestão de OS
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-2xl rounded-3xl border border-slate-200/90 sm:px-10">
          
          {errorMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-800 text-xs animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                E-mail Profissional
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ex: helena@ramadicatelie.com.br"
                  className="block w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-700/40 focus:border-amber-700 transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Senha de Acesso
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
                  className="block w-full pl-10 pr-10 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-700/40 focus:border-amber-700 transition"
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

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-800 focus:ring-amber-700/40 border-slate-300"
                />
                <span>Lembrar de mim na bancada</span>
              </label>
              <span className="text-amber-800 hover:underline cursor-pointer">
                Esqueceu a senha?
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-sm shadow-lg shadow-amber-900/15 transition-all hover:translate-y-[-1px] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Entrando na Bancada...</span>
                </>
              ) : (
                <>
                  <Scissors className="w-4 h-4" />
                  <span>Acessar Sistema</span>
                </>
              )}
            </button>
          </form>

          {/* Atalhos Rápidos para Demonstração */}
          <div className="mt-6 pt-6 border-t border-slate-200/80">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center mb-3">
              Acesso Rápido de Equipe (Demo):
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fillQuickLogin('helena@ramadicatelie.com.br')}
                className="text-left p-2 rounded-lg bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-amber-900 text-[11px] font-semibold transition cursor-pointer"
              >
                🧵 <strong>Dona Helena</strong>
                <span className="block text-[10px] text-amber-700 font-normal">Alfaiataria & Festa</span>
              </button>
              <button
                type="button"
                onClick={() => fillQuickLogin('cadu@ramadicatelie.com.br')}
                className="text-left p-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-[11px] font-semibold transition cursor-pointer"
              >
                👖 <strong>Cadu</strong>
                <span className="block text-[10px] text-slate-500 font-normal">Jeans & Barras</span>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-slate-600">
            Não faz parte da equipe?{' '}
            <button
              type="button"
              onClick={() => onNavigate('register')}
              className="text-amber-800 font-bold hover:underline cursor-pointer"
            >
              Cadastre-se como Profissional
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
