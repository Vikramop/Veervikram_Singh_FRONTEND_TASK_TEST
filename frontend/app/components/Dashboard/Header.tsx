'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import React from 'react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <header className="w-full flex items-center justify-between px-12 py-4 bg-gray-900 text-white shadow-md">
      {/* App Logo / Title */}
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => router.push('/')}
      >
        MyApp
      </h1>

      {/* Right side buttons */}
      <div className="flex items-center gap-6 ">
        {user && <span className="font-semibold">Hi, {user}</span>}

        <button
          onClick={() => router.push('/profile')}
          className=" py-2 px-6 rounded-lg bg-none border-white border-2 hover:bg-gray-600 transition uppercase"
        >
          Profile
        </button>

        <button
          onClick={handleLogout}
          className="py-2 px-6 bg-red-500 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
