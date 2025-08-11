import Image from 'next/image';
import React from 'react';

const LoginBio = () => {
  return (
    <div>
      <div className="mb-3 text-md font-medium text-[#ADADAD] font-bely tracking-widest">
        USE ONESTEP BIOMETICS TO LOGIN
      </div>
      <div className="mb-6 text-gray-400 text-sm">
        Login to your Account made easy with the Onestep Biometrics
      </div>
      <div className="mb-6 font-semibold text-gray-200 text-sm">
        KINDLY SELECT A MESSENGER BELOW
      </div>
      <div className="sm:justify-center sm:flex sm:gap-10 xl:gap-20 mb-6 mx-auto">
        <div className="border-2 border-gray-500 py-6 px-12 rounded-2xl mx-auto max-sm:mb-5 ">
          <Image
            width={10}
            height={10}
            src="/fingerprint.svg"
            alt="fingerprint"
            className="w-20 h-20  mx-auto"
          />
          <span>Touch ID</span>
        </div>
        <div className="border-2 border-gray-500 py-6 px-12 rounded-2xl">
          <Image
            width={10}
            height={10}
            src="/face-id.svg"
            alt="face-id"
            className="w-20 h-20 mx-auto"
          />
          <span>Face ID</span>
        </div>
      </div>
      <p className="mb-2">Having trouble using OneStep Verification?</p>
      {/* Help Centre Button */}
      <button className="w-[70%] mx-auto bg-gradient-to-r from-yellow-600 via-yellow-300 to-yellow-600 text-black font-bold py-2 rounded-lg mb-3 text-base hover:from-yellow-300 hover:to-yellow-400 transition-all">
        HELP CENTRE
      </button>
    </div>
  );
};

export default LoginBio;
