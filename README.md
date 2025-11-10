# 🚀 Sistema de Gerenciamento de Clientes

## 📋 Índice

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
- [Executando o Projeto](#executando-o-projeto)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades](#funcionalidades)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)

## 🛠️ Tecnologias Utilizadas

### Backend
- **NestJS** - Framework Node.js
- **Prisma ORM** - Gerenciamento de banco de dados
- **PostgreSQL** - Banco de dados relacional
- **Class Validator** - Validação de DTOs
- **Swagger** - Documentação da API

### Frontend
- **Next.js 14** - Framework React com App Router
- **React Hook Form** - Gerenciamento de formulários
- **Axios** - Cliente HTTP
- **TailwindCSS** - Estilização
- **Lucide React** - Ícones

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (v18 ou superior)
- **npm** ou **yarn**
- **PostgreSQL** (v14 ou superior)

## 🔧 Instalação

### 1. Clone o repositório

git clone <url-do-repositorio>
cd desafio-maytech### 2. Instale as dependências do Backend

cd backend
npm install### 3. Instale as dependências do Frontend

cd ../frontend
npm install## 🗄️ Configuração do Banco de Dados

### 1. Crie o banco de dados PostgreSQL

# Acesse o PostgreSQL
psql -U postgres

# Crie o banco de dados
CREATE DATABASE clientsdb;

# Saia do PostgreSQL
\q### 2. Configure as variáveis de ambiente do Backend

Copie o arquivo `.env.example` para `.env`:

cd backend
cp .env.example .envEdite o arquivo `.env` com suas credenciais:

DATABASE_URL="postgresql://postgres:sua_senha@localhost:5432/clientsdb?schema=public"
PORT=3001### 3. Execute as migrations do Prisma

# Dentro da pasta backend
npx prisma generate
npx prisma migrate dev --name init### 4. Configure as variáveis de ambiente do Frontend

cd ../frontend
cp .env.example .env.localO arquivo `.env.local` deve conter:

NEXT_PUBLIC_API_URL=http://localhost:3001## 🚀 Executando o Projeto

### Inicie o Backend

cd backend
npm run start:devO backend estará rodando em: `http://localhost:3001`

Swagger disponível em: `http://localhost:3001/api/docs`

### Inicie o Frontend

Em outro terminal:

cd frontend
npm run devO frontend estará rodando em: `http://localhost:3000`

## 📁 Estrutura do Projeto

```
desafio-maytech/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma          # Schema do banco de dados
│   ├── src/
│   │   ├── clients/               # Módulo de clientes
│   │   │   ├── dto/               # Data Transfer Objects
│   │   │   ├── clients.controller.ts
│   │   │   ├── clients.service.ts
│   │   │   └── clients.module.ts
│   │   ├── prisma/                # Módulo Prisma
│   │   │   ├── prisma.service.ts
│   │   │   └── prisma.module.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── .env                       # Variáveis de ambiente
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── clients/           # Páginas de clientes
│   │   │   │   ├── page.tsx       # Listagem
│   │   │   │   ├── new/page.tsx   # Cadastro
│   │   │   │   └── [id]/page.tsx  # Edição
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── globals.css
│   │   ├── components/            # Componentes reutilizáveis
│   │   │   ├── Navbar.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Toast.tsx
│   │   └── lib/
│   │       └── api.ts             # Cliente HTTP
│   ├── .env.local                 # Variáveis de ambiente
│   └── package.json
│
└── README.md
```

## ✨ Funcionalidades

### Backend
- ✅ CRUD completo de clientes
- ✅ Validação de dados com Class Validator
- ✅ Tratamento de erros padronizado
- ✅ Validação de email e CPF únicos
- ✅ Documentação Swagger automática
- ✅ Respostas em formato JSON padronizado

### Frontend
- ✅ Listagem de clientes em tabela
- ✅ Cadastro de novos clientes
- ✅ Edição de clientes existentes
- ✅ Exclusão com modal de confirmação
- ✅ Validação de formulários com React Hook Form
- ✅ Mensagens de sucesso/erro (Toast)
- ✅ Interface responsiva com TailwindCSS
- ✅ Loading states

## 🔌 API Endpoints

### Clientes

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/clients` | Lista todos os clientes |
| GET | `/clients/:id` | Busca um cliente por ID |
| POST | `/clients` | Cria um novo cliente |
| PATCH | `/clients/:id` | Atualiza um cliente |
| DELETE | `/clients/:id` | Remove um cliente |

### Formato de Resposta

Todas as respostas seguem o padrão:

```json
{
  "success": true,
  "message": "Mensagem descritiva",
  "data": { }
}
```

### Códigos de Status

- `200` - Sucesso
- `201` - Criado com sucesso
- `400` - Dados inválidos
- `404` - Não encontrado
- `409` - Conflito (email ou CPF já cadastrado)

## 🎨 Validações

### Backend
- Nome: obrigatório
- Email: obrigatório, formato válido, único
- CPF: obrigatório, 11 dígitos numéricos, único
- Telefone: obrigatório

### Frontend
- Validação em tempo real com React Hook Form
- Mensagens de erro descritivas
- Prevenção de submissão com dados inválidos

## 🧪 Testando a API

### Usando o Swagger

Acesse `http://localhost:3001/api/docs` para testar todos os endpoints visualmente.

### Usando curl

```bash
# Criar cliente
curl -X POST http://localhost:3001/clients \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "cpf": "12345678900",
    "phone": "11987654321"
  }'

# Listar clientes
curl http://localhost:3001/clients

# Buscar cliente específico
curl http://localhost:3001/clients/{id}

# Atualizar cliente
curl -X PATCH http://localhost:3001/clients/{id} \
  -H "Content-Type: application/json" \
  -d '{"name": "João Silva Atualizado"}'

# Deletar cliente
curl -X DELETE http://localhost:3001/clients/{id}
```

## 📝 Comandos Úteis

### Backend

```bash
# Desenvolvimento
npm run start:dev

# Build
npm run build

# Produção
npm run start:prod

# Prisma Studio (GUI do banco)
npm run prisma:studio

# Gerar cliente Prisma
npm run prisma:generate

# Criar migration
npm run prisma:migrate
```

### Frontend

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Produção
npm run start

# Lint
npm run lint
```

## 🐛 Troubleshooting

### Erro de conexão com o banco de dados
- Verifique se o PostgreSQL está rodando
- Confirme as credenciais no arquivo `.env`
- Teste a conexão: `psql -U postgres -d clientsdb`

### Porta já em uso
- Backend: Altere a porta no `.env` (padrão 3001)
- Frontend: Use `npm run dev -- -p 3001` para outra porta

### Erro ao executar migrations
```bash
# Reset o banco (ATENÇÃO: apaga todos os dados)
npx prisma migrate reset

# Recrie as migrations
npx prisma migrate dev
```

```

O sistema inclui:

## ✅ **Backend (NestJS)**
- Estrutura modular com Prisma ORM
- Validações com Class Validator
- CRUD completo de clientes
- Tratamento de erros padronizado (400, 404, 409)
- Swagger para documentação
- Respostas JSON padronizadas

## ✅ **Frontend (Next.js 14)**
- App Router
- React Hook Form para validação
- Axios para comunicação com API
- TailwindCSS para estilização
- Páginas de listagem, cadastro e edição
- Modal de confirmação para exclusão
- Toast para mensagens de sucesso/erro

## ✅ **Funcionalidades**
- Listagem em tabela
- Cadastro com validação
- Edição de clientes
- Exclusão com confirmação
- Validações de email e CPF únicos
- Mensagens de erro reais da API

## 🚀 **Para rodar o projeto:**

### Opção 1: Script Automático (Recomendado)

```bash
# Dar permissão de execução (apenas na primeira vez)
chmod +x start.sh stop.sh

# Iniciar tudo
./start.sh

# Parar tudo
./stop.sh
```

### Opção 2: Manual

1. **Configurar Banco de Dados:**
```bash
# Criar banco de dados (se não existir)
psql -U postgres -c "CREATE DATABASE clientsdb;"
```

2. **Backend:**
```bash
cd backend
npm install
# O arquivo .env já está configurado, mas você pode editar se necessário
npx prisma generate
npx prisma migrate deploy
npm run start:dev
```

3. **Frontend (em outro terminal):**
```bash
cd frontend
npm install
# O arquivo .env.local já está configurado
npm run dev
```

### 📍 Acessos:

- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:3001`
- **Swagger Docs**: `http://localhost:3001/api/docs`

### ⚠️ Importante para Git:

Os arquivos `.env` e `.env.local` estão no `.gitignore` e **NÃO serão commitados**.

Para outros desenvolvedores:
1. Copie `.env.example` para `.env` no backend
2. Copie `.env.example` para `.env.local` no frontend
3. Configure as variáveis de ambiente conforme necessário
