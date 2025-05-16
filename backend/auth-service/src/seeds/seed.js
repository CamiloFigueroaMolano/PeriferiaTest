// auth-service/src/seed.js
const { AppDataSource } = require('./data-source');
const userRepository = AppDataSource.getRepository('User');
const bcrypt = require('bcryptjs');

async function seed() {
  await AppDataSource.initialize();

  // Usuarios de prueba
  const users = [
    {
      username: 'prueba1',
      password: await bcrypt.hash('123456', 10),
      name: 'Juan',
      lastname: 'Pérez',
      birthday: '1995-01-01'
    },
    {
      username: 'prueba2',
      password: await bcrypt.hash('123456', 10),
      name: 'Andres',
      lastname: 'Molano',
      birthday: '1990-12-30'
    }
  ];

  for (const user of users) {
    const exists = await userRepository.findOneBy({ username: user.username });
    if (!exists) {
      await userRepository.save(user);
      console.log(`Usuario ${user.username} creado`);
    }
  }

  await AppDataSource.destroy();
  console.log('Seed de usuarios completado');
}

seed();
