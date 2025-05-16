const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const likeController = require('../controllers/like.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

// Crear publicación (requiere login)
router.post('/', authenticateToken, postController.create);

// Nueva ruta para obtener publicaciones del usuario autenticado 
router.get('/my-posts', authenticateToken, postController.getUserPosts);

// Dar like
router.post('/:postId/like', authenticateToken, likeController.like);

// Dar unlike
router.delete('/:postId/like', authenticateToken, likeController.unlike);

// toggle que maneje tanto like como unlike
router.post('/:postId/toggle-like', authenticateToken, likeController.toggleLike);

// Contar likes
router.get('/:postId/likes', likeController.count);
//obtener todas las publicaciones 
router.get('/all-post', authenticateToken, postController.getAllPosts);


// Listar publicaciones 
router.get('/', postController.list);

module.exports = router;
