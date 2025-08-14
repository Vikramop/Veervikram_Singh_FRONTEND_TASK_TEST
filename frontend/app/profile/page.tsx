'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getProfile } from '../api/authApi'; // Adjust path as needed
import Header from '../components/Dashboard/Header';

interface ProfileData {
  firstName?: string;
  lastName?: string;
  email?: string;
  country?: string;
  city?: string;
  address?: string;
  address2?: string;
  zip?: string;
}

const Page = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isIncomplete, setIsIncomplete] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getProfile();

        // Check required fields
        const fields = [
          'firstName',
          'lastName',
          'email',
          'country',
          'city',
          'address',
          'address2',
          'zip',
        ];

        const missing = fields.some((field) => !data?.[field]);

        if (missing) {
          setIsIncomplete(true);
        } else {
          setProfile(data);
        }
      } catch (error) {
        console.error('Failed to load profile', error);
        setIsIncomplete(true); // Treat as incomplete if error
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-white">Loading profile...</div>
    );
  }

  // Show "complete profile" message if incomplete
  if (isIncomplete) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-6rem)]">
          <div className="bg-gray-800 p-8 rounded-lg text-center shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-4">
              Complete Your Profile
            </h2>
            <p className="text-gray-300 mb-6">
              Complete your profile first to see your details.
            </p>
            <button
              onClick={() => router.push('/profile/kyc')}
              className="px-6 py-2 rounded-md bg-yellow-500 hover:bg-yellow-400 text-black font-semibold"
            >
              Go to KYC Page
            </button>
          </div>
        </div>
      </>
    );
  }

  // Show profile info if complete
  return (
    <>
      <Header />
      <div className="p-6 max-w-4xl mx-auto bg-gray-800 rounded-lg text-white mt-10">
        <h1 className="text-3xl font-bold mb-6">Profile Information</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <strong>First Name:</strong> {profile?.firstName}
          </div>
          <div>
            <strong>Last Name:</strong> {profile?.lastName}
          </div>
          <div>
            <strong>Email:</strong> {profile?.email}
          </div>
          <div>
            <strong>Country:</strong> {profile?.country}
          </div>
          <div>
            <strong>City:</strong> {profile?.city}
          </div>
          <div>
            <strong>Address 1:</strong> {profile?.address}
          </div>
          <div>
            <strong>Address 2:</strong> {profile?.address2}
          </div>
          <div>
            <strong>Zip Code:</strong> {profile?.zip}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
