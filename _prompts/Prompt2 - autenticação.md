# Prompt 2 — Autenticação (Ramadic Ateliê)

Agora vamos criar a autenticação do sistema. O sistema deve permitir que uma profissional/costureira ou atendente crie uma conta e faça login no painel operacional do **Ramadic Entre Linhas - Ateliê de Costura**. Use o Neon Auth que já está configurado no projeto "RAMADIC ATELIE".

---

## 1. Tela de Login (Acesso à Bancada / Gestão)
- Campo de E-mail
- Campo de Senha
- Opção "Lembrar de mim" (sessão persistente)
- Botão "Acessar Sistema"
- Link "Não tem conta? Cadastre-se na equipe"
- Botão/Link para retornar à Landing Page pública

---

## 2. Tela de Cadastro de Profissional / Costureira
- Campo de Nome Completo
- Campo de Apelido de Bancada (opcional, ex: "Dona Helena", "Cadu")
- Seleção de Especialidades Principais (ex: Alfaiataria, Barra Original, Vestidos de Festa, Zíperes & Reparos Rápidos)
- Campo de E-mail
- Campo de Senha (mínimo de 6 caracteres)
- Campo de Confirmar Senha
- Botão "Criar Conta de Profissional"
- Link "Já faz parte da equipe? Faça login"

---

## 3. Regras de Negócio e Segurança
- **Vínculo com Banco Neon**: Após o cadastro bem-sucedido, registrar/sincronizar os dados da profissional na tabela `profissionais` vinculada à `alfaiataria_id`.
- **Redirecionamento**: Após login bem-sucedido, redirecionar automaticamente para o **Dashboard Operacional** (Bancada de Costura & Gestão de OS).
- **Tratamento de Erros**: Exibir mensagens claras e elegantes em caso de credenciais inválidas, e-mail já cadastrado ou senhas não coincidentes.
- **Validação de Senha**: Mínimo de 6 caracteres com indicador visual.
- **Persistência de Sessão**: Manter a sessão ativa para que a costureira não precise realizar login repetidamente ao reabrir o navegador.
- **Proteção de Rotas**: Se a usuária já estiver autenticada e tentar acessar `/login`, redirecionar direto para o Dashboard.

---

## 4. Design & Identidade Visual
- Visual sofisticado, acolhedor e de alto padrão (padrão de ateliê de alta costura).
- **Paleta de Cores**: Tons elegantes de **âmbar/dourado, terracota, tons quentes e branco**, harmonizando com a identidade visual do **Ramadic Ateliê**.
- Logotipo oficial com a arte **"Ramadic Entre Linhas - Ateliê de Costura"** em destaque no topo de ambas as telas.
- Micro-interações, ícones modernos (`lucide-react`) e design 100% responsivo para celular, tablet e desktop na bancada.
