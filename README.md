# 📘 Blog Mobile App — Pós-Tech FIAP – Fase 4

## 💡 Sobre o Projeto

Aplicativo mobile desenvolvido com **React Native (Expo)** como parte do **Tech Challenge da Fase 4** da **Pós-Tech da FIAP**. Ele serve como interface mobile para uma plataforma de blog educacional, possibilitando a interação entre professores e alunos por meio da leitura, criação e gestão de postagens.

## 🚀 Funcionalidades

### 📚 Público Geral (professores e alunos autenticados)
- Visualização de postagens
- Leitura de conteúdo completo
- Busca por título ou autor
- Visualização de comentários
- Comentários em posts (opcional)

### 👨‍🏫 Professores (acesso administrativo)
- Criar, editar e excluir postagens
- Cadastrar, editar e excluir professores
- Cadastrar, editar e excluir alunos
- Acessar painel com listagem geral de postagens

## 🧠 Arquitetura da Aplicação

- **React Native + Expo**
- **React Navigation** (pilha condicional)
- **Axios** para requisições HTTP
- **AsyncStorage** para token JWT
- **Context API** para autenticação

## 🗂 Estrutura de Pastas

```
src/
├── api/                # Axios configurado com interceptador
├── components/         # Componentes reutilizáveis
├── contexts/           # AuthContext
├── navigation/         # AppStack com controle de acesso
├── screens/            # Telas agrupadas por módulo
│   ├── Auth/           # Login
│   ├── Posts/          # CRUD de postagens
│   ├── Professors/     # CRUD de professores
│   └── Students/       # CRUD de alunos
└── utils/              # Helpers e validações
```

## 🔐 Autenticação e Autorização

- Login via `/auth/login`
- Token JWT armazenado localmente
- Role-based access:
  - `professor`: acesso total ao sistema
  - `aluno`: acesso restrito à visualização
- Navegação protegida dinamicamente com base no papel do usuário

## 🔧 Como Rodar o Projeto

1. Clone o repositório:
```bash
git clone https://github.com/marianadesouzaaguiar/blog-mobile.git
cd blog-mobile
```

2. Instale as dependências:
```bash
npm install
```

3. Execute com Expo:
```bash
npx expo start
```

> Escaneie o QR Code com o app **Expo Go** no seu celular para testar.

## 🔌 Integração com o Backend

Configure a URL do seu backend em `src/api/index.js`:

```js
baseURL: 'http://10.0.0.5:5000/',
```

Endpoints esperados:
- `/auth/login`
- `/posts`, `/posts/:id`
- `/posts/:id/comments`
- `/professors`, `/professors/:id`
- `/students`, `/students/:id`

## 📽 Apresentação

Grave um vídeo de **até 15 minutos** demonstrando:

- Login como professor
- Visualização e leitura de postagens
- Criação, edição e exclusão de posts
- Cadastro, edição e remoção de professores e alunos

## 🧠 Desafios e Aprendizados

- Condicional de acesso via Context API
- Comunicação segura com API RESTful
- Navegação protegida e baseada em papel
- Gerenciamento de estado com autenticação persistente
- Interface responsiva com React Native + Expo

## 👩‍💻 Desenvolvedora

**Mariana de Souza Aguiar**  
[GitHub: marianadesouzaaguiar](https://github.com/marianadesouzaaguiar)

FIAP – Pós-Tech  
Fase 4 – Welcome to Mobile 🚀
