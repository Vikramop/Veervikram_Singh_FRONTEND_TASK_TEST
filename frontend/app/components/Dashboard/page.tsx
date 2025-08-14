'use client';

import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Header from './Header';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center  text-white">
      <Header />
      <h1 className="text-3xl font-bold mb-4">Welcome, {user}</h1>
      <main className="flex-1 flex items-center justify-center">
        {/* Your dashboard content */}
      </main>
    </main>
  );
}
