import { requestOtp } from '@/app/api/authApi';
import { useAuth } from '@/app/context/AuthContext';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const LoginSocials = () => {
  const { login } = useAuth();
  const router = useRouter();

  const params = useSearchParams();
  const phone = params.get('phone');

  const handleTelegramClick = async () => {
    if (!phone) {
      alert('Please enter your phone number before continuing.');
      return;
    }

    try {
      // 1️⃣ Request the OTP from backend

      console.log('OTP requested successfully for', phone);

      // 2️⃣ Redirect to /login-2
      router.push(`/verification?phone=${encodeURIComponent(phone)}`);
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <div>
      <div className="w-full pb-2 text-center  relative ">
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
          onClick={handleTelegramClick} // Replace with your Telegram OAuth!
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
        <button className="w-[70%] mx-auto bg-gradient-to-r from-yellow-600 via-yellow-300 to-yellow-600 text-black font-bold py-2 rounded-lg mb-3 text-base hover:from-yellow-300 hover:to-yellow-400 transition-all">
          HELP CENTRE
        </button>
      </div>
    </div>
  );
};

export default LoginSocials;
