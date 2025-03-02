require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path'); 

const app = express();
const port = process.env.PORT || 3000;

// Configuração do CORS para permitir o Vercel e o próprio servidor
app.use(cors({
    origin: [
      'https://portfolio-dev-six-pied.vercel.app',
      'https://portfolio-dev-1uzm.onrender.com',
      'http://localhost:3000' 
    ],
    methods: ['GET', 'POST']
  }));

// Configurar conexão com o Neon
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rota principal (para evitar o erro "Cannot GET /")
app.get('/', (req, res) => {
  res.send('Servidor está online! 🚀 Acesse o formulário em: <a href="https://portfolio-dev-six-pied.vercel.app">Vercel</a>');
});

// Rota do formulário
app.post('/submit-form', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const client = await pool.connect();
    await client.query(
      'INSERT INTO messages (name, email, message) VALUES ($1, $2, $3)',
      [name, email, message]
    );
    client.release();
    res.json({ success: true, message: 'Mensagem enviada!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});