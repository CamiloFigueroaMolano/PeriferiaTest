import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Button = styled.button.attrs(() => ({
  // Esto evita que la prop "liked" se pase al DOM
  as: 'button',
}))<{ liked: boolean }>`
  background: ${({ liked }) => (liked ? '#007bff' : '#e0e0e0')};
  color: ${({ liked }) => (liked ? 'white' : '#333')};
  border: none;
  border-radius: 4px;
  padding: 0.4rem 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-left: 1rem;
  transition: background 0.2s;
  &:hover {
    background: #0056b3;
    color: white;
  }
`;

interface LikeButtonProps {
  postId: number;
  initialLiked?: boolean;
  onLikeToggle?: (liked: boolean) => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId, initialLiked = false, onLikeToggle }) => {
  const [liked, setLiked] = useState(initialLiked);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    if (loading) return;
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      if (!liked) {
        await axios.post(
          `http://localhost:3001/posts/${postId}/like`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLiked(true);
        if (onLikeToggle) onLikeToggle(true);
      } else {
        await axios.delete(
          `http://localhost:3001/posts/${postId}/like`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLiked(false);
        if (onLikeToggle) onLikeToggle(false);
      }
    } catch (err) {
      alert('Error al actualizar el like');
    }
    setLoading(false);
  };

  return (
    <Button
      type="button"
      liked={liked}
      disabled={loading}
      onClick={handleToggle}
    >
      {liked ? 'Ya te gusta' : 'Me gusta'}
    </Button>
  );
};

export default LikeButton;
