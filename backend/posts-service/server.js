const app = require('./src/app');

const PORT = process.env.PORT || 3001; // Usa un puerto diferente al de auth-service
app.listen(PORT, () => {
  console.log(`Posts service running on port ${PORT}`);
});
