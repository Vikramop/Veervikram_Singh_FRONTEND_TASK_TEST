'use client';

import Image from 'next/image';
import { useState } from 'react';
import { countryFlags, CountryPrefix } from '@/app/types/auth';
import { requestOtp } from '@/app/api/authApi';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [phone, setPhone] = useState('');
  const router = useRouter();

  const matchedCode =
    (Object.keys(countryFlags) as CountryPrefix[])
      .filter((code) => phone.startsWith(code))
      .sort((a, b) => b.length - a.length)[0] || '+234';

  const isoCode = countryFlags[matchedCode] || 'NG';

  const handleTelegramClick = async () => {
    if (!phone) {
      alert('Please enter your phone number before continuing.');
      return;
    }

    try {
      // Request the OTP from backend
      await requestOtp(phone);
      console.log('OTP requested successfully for', phone);
      // Redirect to /login-2
      router.push(`/login-2/${encodeURIComponent(phone)}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert('An unknown error occurred');
      }
    }
  };

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
          <div className="relative z-0 w-full mb-6 group rounded-md border-2 border-gray-600 ">
            {/* Label floated above */}
            <label
              htmlFor="phone"
              className="absolute text-xs font-semibold tracking-wider uppercase top-2 z-10 origin-[0] left-4 text-gray-400 pointer-events-none"
            >
              Phone Number
            </label>

            <div className="flex items-center text-white mt-6 px-3">
              {/* Dynamic country flag */}
              <span className="w-6 h-6 mr-3">
                <Image
                  src={`/${isoCode}.svg`}
                  alt={isoCode}
                  className="w-full h-full object-contain"
                  width={10}
                  height={10}
                />
              </span>

              {/* Vertical Divider */}
              <div className="w-px h-6 bg-gray-600 mx-3" />

              {/* Input field bound to state */}
              <input
                type="tel"
                name="phone"
                id="phone"
                value={phone} // <-- bind to state
                onChange={(e) => setPhone(e.target.value)} // <-- update state
                className="flex-1 bg-transparent focus:outline-none text-lg placeholder-gray-500"
                placeholder="phone number"
                required
                autoComplete="off"
              />
            </div>
          </div>
          <button
            onClick={handleTelegramClick}
            className="cursor-pointer w-15 h-15 flex items-center justify-center bg-yellow-400 hover:bg-yellow-300 transition-all rounded-2xl shadow-lg mx-auto mb-3"
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
