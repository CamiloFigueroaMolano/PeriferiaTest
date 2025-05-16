// src/components/Layout.tsx
import React from 'react';
import Navbar from './Navbar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Navbar />
    <main style={{ marginTop: '80px' }}>{children}</main>
  </>
);

export default Layout;