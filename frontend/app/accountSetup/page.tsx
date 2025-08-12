'use client';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const steps = [
  {
    id: 1,
    title: 'Account Setup',
    subtitle: 'Enter your Account Information',
  },
  {
    id: 2,
    title: 'Setup Passcode',
    subtitle: 'Secure your Account using OneStep Passcode',
  },
];

const countryFlags = {
  '+234': 'NG', // Nigeria
  '+91': 'IN', // India
  '+1': 'US', // US
  '+44': 'GB', // UK
  '+61': 'AU', // Australia
};

export default function Page() {
  const [activeStep, setActiveStep] = useState(0);
  const [dob, setDob] = useState(''); // Stores the selected date
  const inputRef = useRef(null);
  const [phone, setPhone] = useState('');

  const router = useRouter();

  const matchedCode =
    Object.keys(countryFlags)
      .filter((code) => phone.startsWith(code))
      .sort((a, b) => b.length - a.length)[0] || '+234';

  const isoCode = countryFlags[matchedCode] || 'NG';

  return (
    <>
      {/* Brand Logo Bar */}
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

      {/* Main Card */}
      <div className="w-4/5 border-2 border-gray-600 sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-3/5 2xl:w-3/5 mx-auto rounded-2xl shadow-2xl relative mt-12 max-sm:mb-4">
        <div className="w-full rounded-2xl shadow-2xl p-8 pb-12 text-center relative md:px-16 lg:px-24 xl:px-32 2xl:px-60">
          {/* Login Heading */}
          <h2 className="mt-4 text-5xl font-normal text-white mb-2 font-bely tracking-wide pb-2">
            {activeStep === 0 ? 'Setup Your Account' : 'Setup Your Passcode'}
          </h2>
          <p className="text-md text-gray-300 mb-4">
            {activeStep === 0
              ? 'Enter your Username, Date of Birth, and Phone Number below'
              : 'You need to setup your OneStep passcode to properly keep your account completely safe and secured from the prying eyes of hackers'}
          </p>
        </div>
        {/* Stepper Tabs */}
        <div className="flex items-center justify-center mb-8 gap-20 ">
          {steps.map((step, idx) => (
            <div key={step.id} className="flex justify-between items-center">
              <div
                className={`rounded-full font-thin font-bely w-12 h-12 flex items-center justify-center text-sm 
                  ${
                    activeStep === idx
                      ? 'bg-gradient-to-r from-gray-400 via-white to-gray-400 text-black font-bold shadow-lg'
                      : 'bg-gray-700 text-white'
                  }`}
              >
                {step.id}
              </div>
              <div className=" ml-3">
                <div
                  className={`mt-2 text-md font-bold font-bely ${
                    activeStep === idx ? 'text-white' : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </div>
                <div className="text-xs text-gray-500 mt-1 ">
                  {step.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Step Content Container */}
        <div className="w-full mt-12 rounded-2xl  shadow-2xl p-8 pb-12 text-center  relative md:px-16 lg:px-24 xl:px-32 2xl:px-60">
          <span className="absolute top-0 left-1/2 -translate-x-1/2 h-[0.5px] w-[70%] bg-gray-600"></span>

          {activeStep === 0 && (
            <>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setActiveStep(1);
                }}
                className="mt-6 space-y-4"
              >
                <div className="relative z-0 w-full mb-6 group rounded-md border-2 border-gray-600">
                  <label
                    htmlFor="username"
                    className="absolute text-xs font-semibold tracking-wider capitalize  top-2 z-10 origin-[0] left-4 text-gray-400 pointer-events-none "
                  >
                    USERNAME
                  </label>
                  <div className="flex items-center  bg-black text-white px-3 py-2 mt-6">
                    {/* Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5.121 17.804A13.937 13.937 0 0112 15c2.29 0 
                            4.435.51 6.364 1.414M15 10a3 3 0 
                            11-6 0 3 3 0 016 0z"
                      />
                    </svg>

                    {/* Vertical Divider */}
                    <div className="w-px h-6 bg-gray-600 mx-3" />

                    {/* Input Field */}
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="flex-1 bg-transparent focus:outline-none text-lg placeholder-gray-500"
                      placeholder="Enter Username"
                      required
                      autoComplete="off"
                    />
                  </div>
                </div>

                <div className="relative z-0 w-full mb-6 group rounded-md border-2 border-gray-600">
                  <label
                    htmlFor="dob"
                    className="absolute text-xs font-semibold tracking-wider uppercase top-2 z-10 origin-[0] left-4 text-gray-400 pointer-events-none"
                  >
                    Date of Birth
                  </label>
                  <div className="flex items-center bg-black text-white px-3 py-2 mt-6">
                    {/* Calendar icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3M16 7V3M4 11h16M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>

                    {/* Vertical divider */}
                    <div className="w-px h-6 bg-gray-600 mx-3"></div>

                    {/* Input Field */}
                    <input
                      type="date"
                      name="dob"
                      id="dob"
                      ref={inputRef}
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="flex-1 bg-transparent focus:outline-none text-lg text-white placeholder-gray-500 border-none appearance-none"
                      placeholder="Select Date of Birth"
                      required
                    />

                    {/* Down half arrow (chevron) */}
                    <button
                      type="button"
                      aria-label="Open calendar"
                      onClick={() =>
                        inputRef.current &&
                        inputRef.current.showPicker &&
                        inputRef.current.showPicker()
                      }
                      tabIndex={-1}
                      className="ml-2 focus:outline-none"
                    >
                      {/* Chevron-down SVG */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

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
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-2 rounded-lg hover:from-yellow-300 hover:to-yellow-400 transition-all"
                >
                  Proceed
                </button>
              </form>
            </>
          )}

          {activeStep === 1 && (
            <>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Registration complete!');
                }}
                className="mt-6 space-y-4"
              >
                <div className="relative z-0 w-full mb-6 group rounded-md border-2 border-gray-600">
                  <label
                    htmlFor="username"
                    className="absolute text-xs font-semibold tracking-wider uppercase  top-2 z-10 origin-[0] left-4 text-gray-400 pointer-events-none "
                  >
                    Passcode
                  </label>
                  <div className="flex items-center  bg-black text-white px-3 py-2 mt-6">
                    {/* Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5.121 17.804A13.937 13.937 0 0112 15c2.29 0 
                            4.435.51 6.364 1.414M15 10a3 3 0 
                            11-6 0 3 3 0 016 0z"
                      />
                    </svg>

                    {/* Vertical Divider */}
                    <div className="w-px h-6 bg-gray-600 mx-3" />

                    {/* Input Field */}
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="flex-1 bg-transparent focus:outline-none text-lg placeholder-gray-500"
                      placeholder="Enter Passcode"
                      required
                      autoComplete="off"
                      maxLength={6}
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  {/* Previous Button */}
                  <button
                    type="button"
                    onClick={() => setActiveStep(0)} // Go back to Account Setup
                    className="w-1/2 border border-gray-600 text-white py-2 rounded-lg hover:bg-gray-800 transition"
                  >
                    Previous
                  </button>

                  {/* Proceed / Finish Button */}
                  <button
                    type="submit"
                    onClick={() => router.push('/')}
                    className="w-1/2 bg-gradient-to-r from-yellow-700 via-yellow-300 to-yellow-700 text-black font-bold py-2 rounded-lg hover:from-yellow-300 hover:via-yellow-800 hover:to-yellow-300 transition-all"
                  >
                    Proceed
                  </button>
                </div>
              </form>
            </>
          )}

          <div className="border-2 border-gray-700 p-2 rounded-md mt-4 text-sm text-start">
            NOTE: Provide correct information relation to yourself, Your Phone
            Number and other details as they will be used for authentication,
            authorization, and verification before payments and other essential
            support services are made.
          </div>
        </div>
      </div>
      {/* Footer Card */}
      <div className="w-full rounded-2xl shadow-2xl p-8 pb-4 text-center relative md:px-16 lg:px-24 xl:px-32 2xl:px-60 mt-6">
        <div className="text-md text-white mb-1 text-center">
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
}
