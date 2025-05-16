const express = require('express');
const { AppDataSource } = require('./data-source');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const cors = require('cors');
const app = express();

// Habilitar CORS
app.use(cors({
  origin: 'http://localhost:3002'  // Permite solo tu frontend
}));


app.use(express.json());

// Rutas de autenticación
app.use('/auth', authRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/users', userRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log('Conexión a PostgreSQL con TypeORM exitosa');
  })
  .catch((error) => console.error('Error al conectar a PostgreSQL:', error));

module.exports = app;
