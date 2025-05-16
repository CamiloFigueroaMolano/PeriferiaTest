import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 80px auto;
  padding: 2rem;
  border-radius: 8px;
  background: #f8f9fa;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background: #0056b3;
  }
`;

const ErrorMsg = styled.div`
  color: #c00;
  margin-bottom: 1rem;
  text-align: center;
`;

const LoginPage: React.FC = () => {
  const navigate = useNavigate(); // Declarar aquí, al inicio del componente
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        username,
        password,
      });
      // Guarda el token en localStorage o Zustand/context
      localStorage.setItem('token', response.data.token);
      // Redirige a la página principal o perfil
      navigate('/profile'); // Usar navigate en lugar de window.location.href
    } catch (err) {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <LoginContainer>
      <Title>Iniciar Sesión</Title>
      <form onSubmit={handleSubmit}>
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <Input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Entrar</Button>
      </form>
    </LoginContainer>
  );
};

export default LoginPage;
