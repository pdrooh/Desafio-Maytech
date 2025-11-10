# 🔧 Solução para Erro ao Cadastrar Clientes

## Problema Identificado

O erro ao cadastrar clientes está ocorrendo porque há um **conflito de portas**:

- **Frontend (Next.js)**: Rodando na porta **3001** (processo 81931)
- **Backend (NestJS)**: Deveria estar na porta **3001**, mas não consegue iniciar porque a porta está ocupada

## ✅ Solução

### Opção 1: Parar o Frontend e Reiniciar (Recomendado)

1. **Parar o frontend atual** (Ctrl+C no terminal onde está rodando)
2. **Reiniciar o frontend na porta 3000** (padrão do Next.js):
   ```bash
   cd frontend
   npm run dev
   ```
   O Next.js usará automaticamente a porta 3000.

3. **Verificar se o backend está rodando na porta 3001**:
   ```bash
   cd backend
   npm run start:dev
   ```

### Opção 2: Mudar a Porta do Backend

Se preferir manter o frontend na porta 3001:

1. Edite o arquivo `backend/.env`:
   ```env
   PORT=3002
   ```

2. Edite o arquivo `frontend/.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3002
   ```

3. Reinicie ambos os servidores.

## 🎯 Verificação

Após corrigir, teste:

1. **Backend**: Acesse `http://localhost:3001/api/docs` (ou 3002 se mudou)
2. **Frontend**: Acesse `http://localhost:3000` (ou 3001 se manteve)
3. **Teste de cadastro**: Tente cadastrar um cliente

## 📝 Melhorias Implementadas

- ✅ Tratamento de erros melhorado no frontend
- ✅ Mensagens de erro mais descritivas
- ✅ Logs no console para debug
- ✅ Timeout de 10 segundos nas requisições
- ✅ Interceptor de erros no Axios

## 🔍 Como Verificar Qual Porta Está em Uso

```bash
# Ver processos nas portas 3000 e 3001
lsof -i :3000
lsof -i :3001

# Ver todas as portas em uso
netstat -an | grep LISTEN | grep -E "3000|3001"
```


