'use client';

import PersonalInfo from '@/app/components/profile/PersonalInfo';
import PhotoId from '@/app/components/profile/PhotoId';
import VerifyIdentity from '@/app/components/profile/VerifyIdentity';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const steps = [
  { id: 1, label: 'Personal Information' },
  { id: 2, label: 'Verify your Identity' },
  { id: 3, label: 'Photo Selfie with ID' },
];

export default function Page() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);

  // Dynamic header and body for each step
  const stepHeaders = [
    ' Complete your Profile',
    ' Verify your Identity',
    ' Selfie with your ID',
  ];
  const stepBodies = [
    <div key="1">
      <PersonalInfo />
    </div>,
    <div key="2">
      <VerifyIdentity />
    </div>,
    <div key="3">
      <PhotoId />
    </div>,
  ];

  return (
    <div className="flex w-full min-h-screen bg- text-white">
      {/* Main Content (80%) */}
      <div className=" md:w-[75%] p-10 flex flex-col">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-gray-400 mb-8">
          <Link href="/" className="flex items-center gap-1 hover:text-white">
            Home
          </Link>
          <span className="mx-1">{'>'}</span>
          <Link href="/profile" className="hover:text-white">
            Profile
          </Link>
          <span className="mx-1">{'>'}</span>
          <span className="text-white font-semibold">KYC and AML</span>
        </div>
        {/* Back Button */}
        <button
          onClick={() => router.push('/profile')}
          className="flex items-center mb-6 text-white font-semibold hover:underline"
        >
          <svg
            width="20"
            height="20"
            fill="none"
            className="mr-2"
            viewBox="0 0 24 24"
          >
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </button>
        {/* 1st: Dynamic step header */}
        <div className="mb-2 bg-[#1E1E20]  rounded-t-2xl">
          <h2 className="text-2xl  font-bely font-thin tracking-wide p-6 ">
            {stepHeaders[activeStep]}
          </h2>
        </div>
        {/* 2nd: Dynamic step content/body */}
        <div className="relative flex-2 mb-2 bg-[#1E1E20] ">
          {stepBodies[activeStep]}
        </div>
        {/* 3rd: Navigation buttons */}
        <div className="flex justify-between gap-4 bg-[#1E1E20] p-6  rounded-b-2xl">
          <button
            className="w-1/2 py-2 rounded-lg bg-none border-white border-2 hover:bg-gray-600 transition uppercase"
            disabled={activeStep === 0}
            onClick={() => setActiveStep(activeStep - 1)}
          >
            Previous
          </button>
          <button
            className="w-1/2 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold uppercase  hover:from-yellow-300 hover:to-yellow-400 transition"
            onClick={() => {
              if (activeStep < steps.length - 1) setActiveStep(activeStep + 1);
              else alert('KYC Complete!'); // replace with next step or redirect
            }}
          >
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
      {/* Sidebar (20%) */}
      <div className="w-[25%] p-8  flex justify-center items-center flex-col gap-8 max-md:hidden">
        <ol className="space-y-16 relative ">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            const isPassed = activeStep > idx;

            return (
              <li
                key={step.id}
                className="relative flex items-center gap-3 font-bely font-thin"
              >
                {/* Step Circle */}
                <div
                  className={`rounded-full w-8 h-8 flex items-center justify-center text-lg
            ${
              isActive
                ? 'bg-yellow-400 text-black'
                : isPassed
                ? 'bg-white text-black'
                : 'bg-gray-700 text-white'
            }
          `}
                >
                  {step.id}
                </div>

                {/* Vertical line (only if not last step) */}
                {idx !== steps.length - 1 && (
                  <span
                    className={`absolute my-4 left-4 top-8 h-10 w-[2px]
              ${isPassed ? 'bg-white' : 'bg-gray-600'}
            `}
                    aria-hidden="true"
                  />
                )}

                {/* Step Label */}
                <span
                  className={
                    isActive
                      ? 'text-yellow-400'
                      : isPassed
                      ? 'text-white'
                      : 'text-gray-400'
                  }
                >
                  {step.label}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
