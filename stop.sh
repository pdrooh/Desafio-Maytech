#!/bin/bash

echo "🛑 Parando Sistema de Clientes..."

# Parar processos do backend
pkill -f "nest start" 2>/dev/null
echo "✅ Backend parado"

# Parar processos do frontend
pkill -f "next dev" 2>/dev/null
echo "✅ Frontend parado"

echo "✨ Todos os servidores foram parados"


