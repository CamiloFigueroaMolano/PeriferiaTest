const { AppDataSource } = require('../data-source');
const postRepository = AppDataSource.getRepository('Post');
const likeRepository = AppDataSource.getRepository('Like'); // Añade esta línea


// Crear una publicación
exports.create = async (req, res) => {
  try {
    const { content } = req.body;
    // El usuario autenticado viene del middleware JWT
    const userId = req.user.id;
    const userName = req.user.username;

    if (!content) {
      return res.status(400).json({ error: 'El contenido es requerido' });
    }

    const post = postRepository.create({
      content,
      userId,
      userName
    });
    await postRepository.save(post);

    res.status(201).json({ message: 'Publicación creada', post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todas las publicaciones
exports.getUserPosts = async (req, res) => {
  try {
    // Obtener el ID del usuario del token JWT
    const userId = req.user.id;
    
    // Buscar todas las publicaciones de este usuario
    const posts = await postRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' }
    });
    
    // Para cada publicación, obtener el conteo de likes
    const postsWithLikes = await Promise.all(posts.map(async (post) => {
      const likesCount = await likeRepository.count({
        where: { postId: post.id }
      });
      
      return {
        ...post,
        likesCount
      };
    }));
    
    res.status(200).json({
      message: 'Publicaciones recuperadas exitosamente',
      posts: postsWithLikes
    });
    
  } catch (err) {
    console.error('Error al obtener publicaciones:', err);
    res.status(500).json({ error: err.message });
  }
};


exports.list = async (req, res) => {
  try {
    const posts = await postRepository.find({
      order: { createdAt: 'DESC' }
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const userId = req.user.id; // ID del usuario autenticado
    const posts = await postRepository.find({
      order: { createdAt: 'DESC' }
    });
    
    // Obtener posts con conteo de likes y verificar si el usuario ya dio like
    const postsWithLikesInfo = await Promise.all(posts.map(async (post) => {
      const likesCount = await likeRepository.count({
        where: { postId: post.id }
      });
      
      // Verificar si el usuario ya dio like a este post
      const userLiked = await likeRepository.findOneBy({ 
        postId: post.id, 
        userId 
      });
      
      return {
        ...post,
        likesCount,
        likedByMe: !!userLiked // Convierte a booleano
      };
    }));
    
    res.json(postsWithLikesInfo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
