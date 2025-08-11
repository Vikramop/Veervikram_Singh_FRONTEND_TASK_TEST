'use client';
import React, { useState } from 'react';
import OtpInput from '../components/auth/OTPInput';
import LoginBio from '../components/auth/LoginBio';
import LoginSocials from '../components/auth/LoginSocials';

enum TabKey {
  Passcode = 'passcode',
  Bio = 'bio',
  Socials = 'socials',
}

const Page = () => {
  const [activeTab, setActiveTab] = useState<TabKey>(TabKey.Passcode);

  const topTab = activeTab;
  const belowTabs = [TabKey.Passcode, TabKey.Bio, TabKey.Socials].filter(
    (t) => t !== topTab
  );

  const renderTopContent = () => {
    switch (topTab) {
      case TabKey.Passcode:
        return (
          <>
            {/* Sub instructions */}
            <div className="mb-3 text-md font-medium text-[#ADADAD] font-bely tracking-widest">
              ONESTEP PASSCODE
            </div>
            <div className="mb-6 text-gray-400 text-sm">
              Enter your Passcode to Log into your Account
            </div>

            <p className="my-6">5 Minutes</p>
            <OtpInput length={6} onChangeOtp={(otp) => console.log(otp)} />
            <a
              href="/signup"
              className="xl:w-[60%] mx-auto block bg-gradient-to-r from-yellow-700 via-yellow-300 to-yellow-700 text-black py-2 mt-2 rounded-lg font-bold text-base hover:from-yellow-300 hover:to-yellow-400 transition-all"
            >
              Proceed
            </a>
            <div className="text-md text-white mb-1 text-center mt-4">
              Can&apos;t remember your Passcode?{' '}
              <a
                href="#"
                className="text-yellow-600 underline hover:text-purple-200"
              >
                Reset Passcode
              </a>
            </div>
          </>
        );
      case TabKey.Bio:
        return <LoginBio />;
      case TabKey.Socials:
        return <LoginSocials />;
      default:
        return null;
    }
  };

  const getTabTitle = (tab: TabKey) => {
    switch (tab) {
      case TabKey.Passcode:
        return 'ONESTEP PASSCODE';
      case TabKey.Bio:
        return 'Use Onestep Biometrics to Login';
      case TabKey.Socials:
        return 'Use Onestep ID to Login';
    }
  };

  return (
    <>
      {/* Brand Logo */}
      <div className="bg-green-80 grid grid-cols-3 items-center px-4 py-2 my-4">
        <div className="text-base font-bold tracking-widest text-white px-4 py-1 max-sm:text-xs">
          Back
        </div>

        <div className="justify-self-center text-base font-bely font-bold tracking-widest bg-gradient-to-r from-white to-purple-500 bg-clip-text text-transparent px-4 py-1 rounded-xl shadow-md max-sm:text-xs">
          ONESTEP
        </div>

        <div className="justify-self-end text-base font-bold tracking-widest text-white px-4 py-1">
          X
        </div>
      </div>

      <div className="w-4/5 sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-3/5 2xl:w-3/5 mx-auto rounded-2xl shadow-2xl relative mt-12 max-sm:mb-4">
        {/* Top card */}
        <div className="w-full rounded-2xl shadow-2xl p-8 pb-12 text-center border-2 border-gray-600 relative md:px-16 lg:px-24 xl:px-32 2xl:px-32">
          {/* Login Heading */}
          <div>
            <h2 className="mt-4 text-5xl font-normal text-white mb-2 font-bely tracking-wide pb-2">
              Login
            </h2>
            <p className="text-xs font-normal text-gray-300 mb-4 text-center">
              Access Wealth with either your OneStep Passcode, OneStep
              Biometrics or OneStep ID Verification
            </p>
          </div>

          {/* Dynamic Top Content */}
          {renderTopContent()}

          {/* Horizontal Divider with OR */}
          <div className="flex items-center my-8">
            <div className="flex-grow border-t border border-gray-700"></div>
            <span className="mx-4 text-white font-semibold text-sm tracking-widest">
              OR
            </span>
            <div className="flex-grow border-t border border-gray-700"></div>
          </div>

          {/* Side by Side Tabs Below */}
          <div className="sm:flex sm:divide-gray-700 sm:divide-x-2 max-sm:divide-y-2 max-sm:divide-gray-700">
            {belowTabs.map((tabKey) => (
              <div
                key={tabKey}
                className="flex-1 py-6 text-white  text-center cursor-pointer hover:bg-gray-800 transition"
                onClick={() => setActiveTab(tabKey)}
              >
                <div className="mb-2  text-md text-white font-bely font-thin text-xl">
                  {getTabTitle(tabKey)}
                </div>
                {/* Mini preview (can adjust or replace with icons) */}
                <div className="mt-2">
                  {tabKey === TabKey.Passcode && <span>Use Passcode</span>}
                  {tabKey === TabKey.Bio && <span>Use Biometrics</span>}
                  {tabKey === TabKey.Socials && <span>Login via Socials</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Card */}
        <div className="w-full rounded-2xl shadow-2xl p-8 pb-4 text-center relative md:px-16 lg:px-24 xl:px-32 2xl:px-60">
          <div className="text-md text-white mb-1 text-center">
            By using Login you agree to our{' '}
            <a
              href="#"
              className="text-yellow-600 underline hover:text-purple-200"
            >
              Terms &amp; Privacy Policy.
            </a>
          </div>

          <div className="mb-2 text-white pt-3 text-xs">Are you new Here?</div>

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
};

export default Page;
