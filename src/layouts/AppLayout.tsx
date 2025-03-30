
import React, { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import { ThemeProvider } from '../context/ThemeContext';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
};

export default AppLayout;
