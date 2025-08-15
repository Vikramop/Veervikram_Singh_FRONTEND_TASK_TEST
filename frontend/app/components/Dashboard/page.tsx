'use client';
import Header from './Header';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Dashboard() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center  text-white">
      <Header />
      {/* <h1 className="text-3xl font-bold mb-4">Welcome, {user}</h1> */}
      <main className="flex-1 flex items-center justify-center">
        <ConnectButton />
      </main>
    </main>
  );
}
