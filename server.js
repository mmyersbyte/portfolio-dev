require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Adicione esta linha
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Configurar CORS para aceitar requests do Vercel
app.use(cors({
  origin: 'https://portfolio-dev-six-pied.vercel.app'
}));

// Configurar conexão com o Neon
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
    res.json({ success: true, message: 'Mensagem enviada!' }); // Resposta JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Erro ao enviar mensagem' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});