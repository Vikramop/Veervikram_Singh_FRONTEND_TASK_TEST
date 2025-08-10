'use client';
import React from 'react';
import OtpInput from '../components/auth/OTPInput';

const page = () => {
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

      <div className="w-4/5   sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-3/5 2xl:w-3/5 mx-auto rounded-2xl shadow-2xl  relative  mt-12 max-sm:mb-4">
        <div className="w-full divide-y-2 divide-gray-400 rounded-2xl shadow-2xl p-8 pb-12 text-center border-2 border-gray-600 relative md:px-16 lg:px-24 xl:px-32 2xl:px-60">
          {/* Login Heading */}
          <div>
            <h2 className="mt-4 text-5xl font-normal text-white mb-2 font-bely tracking-wide pb-2">
              OTP Verification
            </h2>
            <p className="text-md font-semibold text-gray-300 mb-4 text-center">
              Complete the Onestep verification to proceed. It is important for
              account verification
            </p>

            {/* Sub instructions */}

            <div className="mb-6 text-gray-400 text-sm divide-amber-50 divide-y-2">
              Enter the OTP verification code Sent to you
            </div>
          </div>

          <div>
            <p className="my-6">5 Minutes</p>
            <OtpInput length={6} onChangeOtp={(otp) => console.log(otp)} />
            {/* otp enter sec */}

            <a
              href="/signup"
              className="w-full block bg-gradient-to-r from-yellow-600 via-yellow-300 to-yellow-600 text-black py-2 mt-2 rounded-lg font-bold text-base hover:from-yellow-300 hover:to-yellow-400 transition-all"
            >
              Proceed
            </a>
            <div className="text-md text-white mb-1 text-center mt-4">
              Didn&apos;t receive your OTP?{' '}
              <a
                href="#"
                className="text-yellow-600 underline hover:text-purple-200"
              >
                Resend OTP
              </a>
            </div>
          </div>
        </div>

        {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

        <div className="text-md text-white mb-1 text-center mt-8">
          By using Login you agree to our{' '}
          <a
            href="#"
            className="text-yellow-600 underline hover:text-purple-200"
          >
            Terms &amp; Privacy Policy.
          </a>
        </div>
      </div>
    </>
  );
};

export default page;
