require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Configuração do banco de dados Neon
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Serve arquivos estáticos (index.html)

// Rota para o formulário
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Rota para processar o formulário
app.post('/submit-form', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const client = await pool.connect();
    await client.query(
      'INSERT INTO messages (name, email, message) VALUES ($1, $2, $3)',
      [name, email, message]
    );
    client.release();
    res.redirect('/?success=true'); // Redireciona com mensagem de sucesso
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao salvar mensagem');
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});