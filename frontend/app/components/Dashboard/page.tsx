'use client';

import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-green-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user}</h1>

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition font-semibold"
      >
        Logout
      </button>
    </main>
  );
}
