'use client';

import { useAuth } from '../../context/AuthContext';

export default function LoginForm() {
  const { login } = useAuth();

  return (
    <div className="w-full max-w-md mx-auto bg-[#171617] rounded-2xl shadow-2xl p-8 text-center border border-gray-800 relative">
      {/* Brand Logo */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-8">
        <span className="text-base font-bold tracking-widest text-white bg-gradient-to-r from-purple-400 to-pink-400 px-4 py-1 rounded-xl shadow-md">
          ONESTEP
        </span>
      </div>

      {/* Login Heading */}
      <h2 className="mt-8 text-3xl font-extrabold text-white mb-2 font-concreate">
        Login
      </h2>
      <p className="text-xs text-gray-300 mb-4">
        Access Wealth with either your OneStep Passcode, OneStep Biometrics or
        OneStep ID Verification
      </p>

      {/* Sub instructions */}
      <div className="mb-3 text-gray-300 text-sm font-bold">
        USE ONESTEP ID TO LOGIN
      </div>
      <div className="mb-6 text-gray-400 text-xs">
        Use the OneStep Verification to Log into your Account
      </div>
      <div className="mb-6 font-semibold text-gray-200 text-sm">
        KINDLY SELECT A MESSENGER BELOW
      </div>

      {/* Telegram Button */}
      <button
        className="w-20 h-20 flex items-center justify-center bg-yellow-400 hover:bg-yellow-300 transition-all rounded-2xl shadow-lg mx-auto mb-3"
        onClick={() => login('Demo User')} // Replace this with your Telegram OAuth flow!
        title="Login via Telegram"
      >
        <img src="/telegram-logo.svg" alt="Telegram" className="w-10 h-10" />
      </button>

      {/* Recovery Center link */}
      <a
        href="#"
        className="block text-xs text-yellow-400 hover:underline mb-8"
      >
        Recovery Center
      </a>

      {/* Help Centre Button */}
      <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-2 rounded-lg mb-3 text-base hover:from-yellow-300 hover:to-yellow-400 transition-all">
        HELP CENTRE
      </button>

      {/* Terms & Privacy */}
      <div className="text-[0.6rem] text-gray-500 mb-1">
        By using Login you agree to our{' '}
        <a href="#" className="text-purple-300 underline hover:text-purple-200">
          Terms &amp; Privacy Policy
        </a>
        .
      </div>

      {/* Sign Up CTA */}
      <a
        href="/signup"
        className="w-full block bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-2 mt-2 rounded-lg font-bold text-base hover:from-yellow-300 hover:to-yellow-400 transition-all"
      >
        SIGN UP
      </a>
    </div>
  );
}
