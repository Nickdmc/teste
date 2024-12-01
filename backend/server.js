// Disable dotenv in a production environment
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config(); 
}

const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const helmet = require('helmet');


const routes = require('./routes');


const app = express();


const port = process.env.PORT || 3335;


const corsOptions = {
  origin: process.env.FRONTEND_URL || '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
};


app.use(cors(corsOptions)); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(logger('dev')); 
app.use(helmet()); 


app.use('/api', routes); 


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
