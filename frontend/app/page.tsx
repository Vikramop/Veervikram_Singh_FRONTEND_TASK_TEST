'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './context/AuthContext';
import Dashboard from './components/Dashboard/page';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If NOT logged in and not loading, redirect to login
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="text-center mt-10 text-white">Loading...</div>;
  }

  // Only show Dashboard if logged in (otherwise, redirect will trigger)
  return user ? <Dashboard /> : null;
}
