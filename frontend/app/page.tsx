'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Dashboard from './components/Dashboard/page';

export default function HomePage() {
  const router = useRouter();
  const [hasToken, setHasToken] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem('authToken');

    if (token) {
      setHasToken(true); // ✅ Show dashboard
    } else {
      router.replace('/login'); // ❌ No token → go to login
    }
  }, [router]);

  // While we're checking token
  if (hasToken === null) {
    return <div className="text-center mt-10 text-white">Loading...</div>;
  }

  // Render dashboard if token exists
  return hasToken ? <Dashboard /> : null;
}
