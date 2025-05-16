// src/components/Navbar.tsx
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const NavbarContainer = styled.nav`
  background-color: #333;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const NavTitle = styled.div`
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const NavItem = styled.div`
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #444;
  }
`;

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const goToProfile = () => {
    navigate('/profile');
  };
  const goToPosts = () => {
    navigate('/posts');
  };

  return (
    <NavbarContainer>
      <NavTitle>Mi Red Social</NavTitle>
      <NavLinks>
        <NavItem onClick={goToProfile}>Perfil</NavItem>
        <NavItem onClick={goToPosts}>Entradas</NavItem>
        <NavItem onClick={handleLogout}>Cerrar Sesión</NavItem>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
