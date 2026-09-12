// Serviço de Autenticação - Ramadic Ateliê

const STORAGE_KEY_USER = 'ramadic_auth_user';
const STORAGE_KEY_USERS_DB = 'ramadic_registered_professionals';

// Usuários padrão da equipe
const INITIAL_PROFESSIONALS = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    nome: 'Maria Helena Ramadic',
    apelido_bancada: 'Dona Helena',
    email: 'helena@ramadicatelie.com.br',
    password: 'senha123',
    especialidades: ['ALFAIATARIA', 'VESTIDO_FESTA', 'ALTA_COSTURA'],
    cargo: 'Mestra Alfaiate',
    comissao: 20.0
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    nome: 'Carlos Eduardo Lima',
    apelido_bancada: 'Cadu',
    email: 'cadu@ramadicatelie.com.br',
    password: 'senha123',
    especialidades: ['JEANS', 'BARRA_ORIGINAL', 'ZIPER', 'REPAROS_RAPIDOS'],
    cargo: 'Costureiro Especialista',
    comissao: 15.0
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    nome: 'Ana Paula Silva',
    apelido_bancada: 'Ana',
    email: 'ana@ramadicatelie.com.br',
    password: 'senha123',
    especialidades: ['ATENDIMENTO', 'PROVA_BALCAO', 'MEDICAO'],
    cargo: 'Consultora de Prova & Atendimento',
    comissao: 5.0
  }
];

function getStoredUsers() {
  const stored = localStorage.getItem(STORAGE_KEY_USERS_DB);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(INITIAL_PROFESSIONALS));
    return INITIAL_PROFESSIONALS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return INITIAL_PROFESSIONALS;
  }
}

export const authService = {
  // Obter usuário logado na sessão ativa
  getCurrentUser() {
    const data = localStorage.getItem(STORAGE_KEY_USER);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  },

  // Login de Costureira / Atendente
  async login(email, password, rememberMe = true) {
    await new Promise((res) => setTimeout(res, 400)); // Simula latência de rede
    const cleanEmail = email.trim().toLowerCase();
    const users = getStoredUsers();

    const user = users.find(
      (u) => u.email.toLowerCase() === cleanEmail && u.password === password
    );

    if (!user) {
      throw new Error('E-mail ou senha incorretos. Por favor, tente novamente.');
    }

    const { password: _, ...userSession } = user;
    if (rememberMe) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(userSession));
    } else {
      sessionStorage.setItem(STORAGE_KEY_USER, JSON.stringify(userSession));
    }

    return userSession;
  },

  // Cadastro de nova Profissional
  async register({ nome, apelido_bancada, email, password, especialidades }) {
    await new Promise((res) => setTimeout(res, 500));
    const cleanEmail = email.trim().toLowerCase();
    const users = getStoredUsers();

    if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
      throw new Error('Este e-mail já está cadastrado para outro profissional.');
    }

    const newUser = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      nome: nome.trim(),
      apelido_bancada: apelido_bancada?.trim() || nome.split(' ')[0],
      email: cleanEmail,
      password,
      especialidades: especialidades && especialidades.length > 0 ? especialidades : ['AJUSTES_GERAIS'],
      cargo: 'Costureira(o) de Bancada',
      comissao: 15.0,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(users));

    const { password: _, ...userSession } = newUser;
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(userSession));

    return userSession;
  },

  // Logout
  logout() {
    localStorage.removeItem(STORAGE_KEY_USER);
    sessionStorage.removeItem(STORAGE_KEY_USER);
  }
};
