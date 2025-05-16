const { AppDataSource } = require('../data-source');
const likeRepository = AppDataSource.getRepository('Like');

// Dar like a una publicación
exports.like = async (req, res) => {
  try {
    const postId = parseInt(req.params.postId);
    const userId = req.user.id;

    // Evitar likes duplicados
    const existing = await likeRepository.findOneBy({ postId, userId });
    if (existing) {
      return res.status(400).json({ error: 'Ya diste like a este post' });
    }

    const like = likeRepository.create({ postId, userId });
    await likeRepository.save(like);

    res.status(201).json({ message: 'Like registrado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.unlike = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.id;
    
    // Eliminar el registro de like de la base de datos
    await likeRepository.delete({
      postId: parseInt(postId),
      userId: userId
    });
    
    res.status(200).json({ message: 'Like removido correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.toggleLike = async (req, res) => {
  try {
    const postId = parseInt(req.params.postId);
    const userId = req.user.id;
    
    // Buscar si ya existe un like
    const existing = await likeRepository.findOneBy({ postId, userId });
    
    if (existing) {
      // Si existe, eliminar el like (unlike)
      await likeRepository.delete({
        postId,
        userId
      });
      res.status(200).json({ message: 'Like removido correctamente', action: 'Unlike' });
    } else {
      // Si no existe, crear un nuevo like
      const like = likeRepository.create({ postId, userId });
      await likeRepository.save(like);
      res.status(201).json({ message: 'Like registrado', action: 'Like' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Contar likes de un post
exports.count = async (req, res) => {
  try {
    const postId = parseInt(req.params.postId);
    const count = await likeRepository.count({ where: { postId } });
    res.json({ postId, likes: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
