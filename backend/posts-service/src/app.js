const express = require('express');
const { AppDataSource } = require('./data-source');
const postRoutes = require('./routes/post.routes');
const cors = require('cors');
const app = express();

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:3002', // Tu frontend
  optionsSuccessStatus: 200
}));

// Middleware para parsear JSON
app.use(express.json());

// Rutas de publicaciones
app.use('/posts', postRoutes);

// Endpoint de salud (opcional)
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Inicializar la conexión a la base de datos
AppDataSource.initialize()
  .then(() => {
    console.log('Conexión a PostgreSQL con TypeORM exitosa');
  })
  .catch((error) => console.error('Error al conectar a PostgreSQL:', error));

module.exports = app;
