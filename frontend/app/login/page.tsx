'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/auth/LoginForm';

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If user is logged in and not still loading, send them to dashboard (/)
    if (!loading && user) {
      router.replace('/'); // replace instead of push to prevent going "back" to login
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  // If not logged in, show LoginForm
  return (
    <main className=" min-h-screen items-center justify-center bg-black text-white ">
      <LoginForm />
    </main>
  );
}
