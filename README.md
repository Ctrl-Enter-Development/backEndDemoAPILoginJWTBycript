# apiSecretariaDesenvolvimentoRural

# NOME_DA_SUA_API

Descrição breve da sua API

## Requisitos

- Node.js
- MySQL

A API estará acessível em http://localhost:3000.

## Endpoints
POST /api/signup: Cria um novo usuário. Requer um corpo JSON com os campos userName, email e password.
POST /api/login: Faz login do usuário. Requer um corpo JSON com os campos email e password.
GET /api/protected: Rota protegida. Requer um token JWT válido no cabeçalho Authorization para acessar.

## Configure as variáveis de ambiente:

Renomeie o arquivo .env.example para .env.
Edite o arquivo .env e insira as configurações do seu banco de dados e a chave secreta para o JWT.