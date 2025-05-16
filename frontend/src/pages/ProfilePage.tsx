import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Layout from '../components/Layout';

const ProfileContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 8px;
  background: #f8f9fa;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const InfoItem = styled.div`
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

interface Profile {
  username: string;
  name: string;
  lastname: string;
  birthday: string;
  createdAt: string;
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
      } catch (err) {
        setError('No se pudo cargar el perfil. Por favor, inicia sesión de nuevo.');
      }
    };

    fetchProfile();
  }, []);

  return (
    <Layout>
      <ProfileContainer>
        {error ? (
          <div>{error}</div>
        ) : !profile ? (
          <div>Cargando perfil...</div>
        ) : (
          <>
            <Title>Mi Perfil</Title>
            <InfoItem><strong>Usuario:</strong> {profile.username}</InfoItem>
            <InfoItem><strong>Nombre:</strong> {profile.name}</InfoItem>
            <InfoItem><strong>Apellido:</strong> {profile.lastname}</InfoItem>
            <InfoItem><strong>Fecha de nacimiento:</strong> {profile.birthday}</InfoItem>
            <InfoItem><strong>Fecha de registro:</strong> {new Date(profile.createdAt).toLocaleDateString()}</InfoItem>
          </>
        )}
      </ProfileContainer>
    </Layout>
  );
};

export default ProfilePage;
