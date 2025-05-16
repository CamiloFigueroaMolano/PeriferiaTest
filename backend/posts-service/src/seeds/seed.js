// posts-service/src/seed.js
const { AppDataSource } = require('./data-source');
const postRepository = AppDataSource.getRepository('Post');

async function seed() {
  await AppDataSource.initialize();

  // Publicaciones de prueba
  const posts = [
    {
      content: '¡Hola mundo desde el usuario 1!',
      userId: 1,
      userName: 'prueba1'
    },
    {
      content: 'Esta es otra publicación de prueba.',
      userId: 2,
      userName: 'prueba2'
    }
  ];

  for (const post of posts) {
    await postRepository.save(post);
    console.log(`Post creado: ${post.content}`);
  }

  await AppDataSource.destroy();
  console.log('Seed de posts completado');
}

seed();
