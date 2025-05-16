// src/pages/AllPostsPage.tsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Layout from '../components/Layout';
import LikeButton from '../components/LikeButton';

const PostsContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 0;
`;

const PostCard = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  margin-bottom: 1.5rem;
  padding: 1.25rem;
`;

const PostHeader = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const PostContent = styled.div`
  margin-bottom: 0.75rem;
`;

const LikesContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Likes = styled.span`
  color: #007bff;
  font-weight: bold;
`;

const NewPostForm = styled.form`
  background: #f4f4f4;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NewPostInput = styled.textarea`
  resize: none;
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 0.75rem;
  font-size: 1rem;
  min-height: 60px;
`;

const NewPostButton = styled.button`
  align-self: flex-end;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1.5rem;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background: #0056b3;
  }
`;

interface Post {
  id: number;
  content: string;
  userName: string;
  createdAt: string;
  likesCount: number;
  likedByMe: boolean;
}

const AllPostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState('');
  const [newPost, setNewPost] = useState('');
  const [posting, setPosting] = useState(false);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No hay token de autenticación, inicie sesión de nuevo');
        return;
      }
      const res = await axios.get('http://localhost:3001/posts/all-post', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(res.data);
    } catch (err) {
      setError('No se pudieron cargar las publicaciones.');
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line
  }, []);

  // Crear nuevo post
  const handleNewPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    setPosting(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:3001/posts',
        { content: newPost },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewPost('');
      fetchPosts(); // Refresca la lista de posts
    } catch (err) {
      setError('No se pudo crear la publicación.');
    }
    setPosting(false);
  };

  return (
    <Layout>
      <PostsContainer>
        <h2>Publicaciones de todos los usuarios</h2>
        <NewPostForm onSubmit={handleNewPost}>
          <NewPostInput
            placeholder="¿En qué estás pensando?"
            value={newPost}
            onChange={e => setNewPost(e.target.value)}
            disabled={posting}
          />
          <NewPostButton type="submit" disabled={posting || !newPost.trim()}>
            Publicar
          </NewPostButton>
        </NewPostForm>
        {error && <div>{error}</div>}
        {posts.length === 0 && !error && <div>No hay publicaciones aún.</div>}
        {posts.map(post => (
          <PostCard key={post.id}>
            <PostHeader>
              {post.userName} &middot; <small>{new Date(post.createdAt).toLocaleString()}</small>
            </PostHeader>
            <PostContent>{post.content}</PostContent>
            <LikesContainer>
              <Likes>Likes: {post.likesCount}</Likes>
              <LikeButton
                postId={post.id}
                initialLiked={post.likedByMe}
                onLikeToggle={(nuevoEstado) => {
                  setPosts(posts.map(postItem =>
                    postItem.id === post.id
                      ? { ...postItem, likesCount: postItem.likesCount + (nuevoEstado ? 1 : -1) }
                      : postItem
                  ));
                }}
              />
            </LikesContainer>
          </PostCard>
        ))}
      </PostsContainer>
    </Layout>
  );
};

export default AllPostsPage;
