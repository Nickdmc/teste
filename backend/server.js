// Disable dotenv in a production environment
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config(); // Carrega as variáveis do arquivo .env
}

const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const helmet = require('helmet');

// Importa as rotas
const routes = require('./routes');

// Inicializa o express
const app = express();

// Define a porta, com fallback para 3335
const port = process.env.PORT || 3335;

// Configuração do CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*', // Permite acesso do frontend, usa "*" se não configurado
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
};

// Middlewares
app.use(cors(corsOptions)); // Habilita CORS
app.use(express.json()); // Suporte a JSON no corpo das requisições
app.use(express.urlencoded({ extended: true })); // Suporte para dados de formulários
app.use(logger('dev')); // Loga requisições em desenvolvimento
app.use(helmet()); // Segurança adicional para headers HTTP

// Middleware para rotas
app.use('/api', routes); // Prefixa as rotas com "/api"

// Listener para inicializar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
