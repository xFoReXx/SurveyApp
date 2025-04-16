// components/Layout.js
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Navigation from './Navigation';
import useAuth from '../hooks/useAuth';
import useTheme from '../hooks/useTheme';

export default function Layout({ children }) {
  const { user, loading } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to login if not authenticated (except for index page)
    if (!loading && !user && router.pathname !== '/') {
      router.push('/');
    }
    
    // Redirect to dashboard if authenticated and on index page
    if (!loading && user && router.pathname === '/') {
      router.push('/dashboard');
    }
  }, [user, loading, router]);
  
  if (loading) {
    return <div className="loading">Ładowanie...</div>;
  }
  
  return (
    <div className={`app-container ${theme}`}>
      {user && <Navigation />}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}