# 📦 Instruções para Git

## ✅ Arquivos que SERÃO commitados:

- ✅ Todo o código fonte (backend/src, frontend/src)
- ✅ Arquivos de configuração (package.json, tsconfig.json, etc.)
- ✅ Schema do Prisma (prisma/schema.prisma)
- ✅ Migrations do Prisma (prisma/migrations/)
- ✅ README.md
- ✅ Scripts de inicialização (start.sh, stop.sh)
- ✅ Arquivos .env.example

## ❌ Arquivos que NÃO serão commitados (estão no .gitignore):

- ❌ `.env` (backend)
- ❌ `.env.local` (frontend)
- ❌ `node_modules/`
- ❌ `dist/` e `.next/`
- ❌ Logs e arquivos temporários

## 🚀 Comandos Git:

```bash
# 1. Verificar status
git status

# 2. Adicionar arquivos
git add .

# 3. Verificar o que será commitado
git status

# 4. Commit
git commit -m "feat: Sistema completo de gerenciamento de clientes"

# 5. Push (se já tiver remote configurado)
git push origin main
```

## 📝 Para outros desenvolvedores:

Após clonar o repositório:

```bash
# 1. Backend
cd backend
cp .env.example .env
# Edite o .env com suas credenciais do PostgreSQL
npm install
npx prisma generate
npx prisma migrate deploy

# 2. Frontend
cd ../frontend
cp .env.example .env.local
# Edite o .env.local se necessário
npm install

# 3. Iniciar
cd ..
./start.sh
```


