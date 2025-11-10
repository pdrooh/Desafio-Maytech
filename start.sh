#!/bin/bash

echo "🚀 Iniciando Sistema de Clientes..."
echo ""

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar se PostgreSQL está rodando
echo -e "${BLUE}📊 Verificando PostgreSQL...${NC}"
if ! pg_isready -U postgres > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  PostgreSQL não está rodando. Inicie o PostgreSQL primeiro.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ PostgreSQL está rodando${NC}"

# Verificar se o banco existe
echo -e "${BLUE}🗄️  Verificando banco de dados...${NC}"
cd backend
if ! psql -U postgres -lqt | cut -d \| -f 1 | grep -qw clientsdb; then
    echo -e "${YELLOW}📦 Criando banco de dados...${NC}"
    psql -U postgres -c "CREATE DATABASE clientsdb;" 2>/dev/null
fi
echo -e "${GREEN}✅ Banco de dados pronto${NC}"

# Gerar Prisma Client
echo -e "${BLUE}🔧 Gerando Prisma Client...${NC}"
npx prisma generate > /dev/null 2>&1
echo -e "${GREEN}✅ Prisma Client gerado${NC}"

# Aplicar migrations
echo -e "${BLUE}📝 Aplicando migrations...${NC}"
npx prisma migrate deploy > /dev/null 2>&1 || npx prisma migrate dev --name init > /dev/null 2>&1
echo -e "${GREEN}✅ Migrations aplicadas${NC}"

# Iniciar Backend
echo -e "${BLUE}🔙 Iniciando Backend (porta 3001)...${NC}"
npm run start:dev > ../backend.log 2>&1 &
BACKEND_PID=$!
echo -e "${GREEN}✅ Backend iniciado (PID: $BACKEND_PID)${NC}"

# Aguardar backend iniciar
sleep 5

# Iniciar Frontend
cd ../frontend
echo -e "${BLUE}🔜 Iniciando Frontend (porta 3000)...${NC}"
PORT=3000 npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
echo -e "${GREEN}✅ Frontend iniciado (PID: $FRONTEND_PID)${NC}"

echo ""
echo -e "${GREEN}✨ Sistema iniciado com sucesso!${NC}"
echo ""
echo -e "${BLUE}📍 Acessos:${NC}"
echo -e "   Frontend: ${GREEN}http://localhost:3000${NC}"
echo -e "   Backend:  ${GREEN}http://localhost:3001${NC}"
echo -e "   Swagger:  ${GREEN}http://localhost:3001/api/docs${NC}"
echo ""
echo -e "${YELLOW}📝 Logs:${NC}"
echo -e "   Backend:  tail -f backend.log"
echo -e "   Frontend: tail -f frontend.log"
echo ""
echo -e "${YELLOW}🛑 Para parar os servidores:${NC}"
echo -e "   kill $BACKEND_PID $FRONTEND_PID"
echo ""


