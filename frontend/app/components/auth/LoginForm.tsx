'use client';

import Image from 'next/image';
import { useAuth } from '../../context/AuthContext';

export default function LoginForm() {
  const { login } = useAuth();

  return (
    <>
      {/* Brand Logo */}
      <div className="bg-green-80 grid grid-cols-3 items-center px-4 py-2 my-4">
        {/* Left text */}
        <div className="text-base font-bold tracking-widest text-white px-4 py-1 max-sm:text-xs">
          Create Account
        </div>

        {/* Center text */}
        <div className="justify-self-center text-base font-bely font-bold tracking-widest bg-gradient-to-r from-white to-purple-500 bg-clip-text text-transparent px-4 py-1 rounded-xl shadow-md max-sm:text-xs">
          ONESTEP
        </div>

        {/* Right text */}
        <div className="justify-self-end text-base font-bold tracking-widest text-white px-4 py-1">
          X
        </div>
      </div>

      <div className="w-4/5 sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-3/5 2xl:w-3/5 mx-auto rounded-2xl shadow-2xl  relative  mt-12 max-sm:mb-4">
        <div className="w-full rounded-2xl shadow-2xl p-8 pb-12 text-center border-2 border-gray-600 relative md:px-16 lg:px-24 xl:px-32 2xl:px-60">
          {/* Login Heading */}
          <h2 className="mt-4 text-5xl font-normal text-white mb-2 font-bely tracking-wide pb-2">
            Login
          </h2>
          <p className="text-xs text-gray-300 mb-4">
            Access Wealth with either your OneStep Passcode, OneStep Biometrics
            or OneStep ID Verification
          </p>

          {/* Sub instructions */}
          <div className="mb-3 text-md font-medium text-[#ADADAD] font-bely tracking-widest">
            USE ONESTEP ID TO LOGIN
          </div>
          <div className="mb-6 text-gray-400 text-sm">
            Use the OneStep Verification to Log into your Account
          </div>
          <div className="mb-6 font-semibold text-gray-200 text-sm">
            KINDLY SELECT A MESSENGER BELOW
          </div>

          {/* Telegram Button */}
          <button
            className="w-15 h-15 flex items-center justify-center bg-yellow-400 hover:bg-yellow-300 transition-all rounded-2xl shadow-lg mx-auto mb-3"
            onClick={() => login('Demo User')} // Replace with your Telegram OAuth!
            title="Login via Telegram"
          >
            <Image
              width={10}
              height={10}
              src="/tele.svg"
              alt="Telegram"
              className="w-10 h-10"
            />
          </button>

          {/* Recovery Center link */}
          <a
            href="#"
            className="block text-xs text-yellow-400 hover:underline mb-4 font-bold"
          >
            Recovery Center
          </a>
          <p className="mb-2">Having trouble using OneStep Verification?</p>
          {/* Help Centre Button */}
          <button className="w-full bg-gradient-to-r from-yellow-600 via-yellow-300 to-yellow-600 text-black font-bold py-2 rounded-lg mb-3 text-base hover:from-yellow-300 hover:to-yellow-400 transition-all">
            HELP CENTRE
          </button>
        </div>

        {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

        <div className="w-full rounded-2xl shadow-2xl p-8 pb-4 text-center relative md:px-16 lg:px-24 xl:px-32 2xl:px-60">
          {/* Terms & Privacy */}
          <div className="text-md text-white mb-1 text-center">
            By using Login you agree to our{' '}
            <a
              href="#"
              className="text-yellow-600 underline hover:text-purple-200"
            >
              Terms &amp; Privacy Policy.
            </a>
          </div>

          <div className="mb-2  text-white pt-3 text-xs">Are you new Here?</div>

          {/* Sign Up CTA */}
          <a
            href="/signup"
            className="w-full block bg-gradient-to-r from-yellow-600 via-yellow-300 to-yellow-600 text-black py-2 mt-2 rounded-lg font-bold text-base hover:from-yellow-300 hover:to-yellow-400 transition-all"
          >
            SIGN UP
          </a>
        </div>
      </div>
    </>
  );
}
