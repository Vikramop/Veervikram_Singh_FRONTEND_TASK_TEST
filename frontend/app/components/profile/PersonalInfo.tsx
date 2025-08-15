'use client';

import React from 'react';
import { countryList } from '@/app/types/auth';

interface PersonalInfoProps {
  data: {
    firstname: string;
    lastname: string;
    email: string;
    country: string;
    city: string;
    address: string;
    address2: string;
    zip: string;
  };
  setData: React.Dispatch<React.SetStateAction<PersonalInfoProps['data']>>;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ data, setData }) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleCountrySelect = (country: string) => {
    setData({ ...data, country });
    setDropdownOpen(false);
  };

  return (
    <div className="p-6">
      <p className="font-bold">Step 1: Personal Info</p>
      <p className="text-xs bg-[#2C2B1A] my-4 px-4 py-2 rounded-md w-fit tracking-wider text-[#c6b686]">
        Carefully fill the form below. Please ensure to input your authentic
        information only
      </p>

      <div className="md:flex md:gap-5">
        <div className="relative z-0 w-full mb-6 group rounded-md border-2 border-white pt-2">
          <label
            htmlFor="firstname"
            className="text-xs font-semibold tracking-wider uppercase px-3 text-white pointer-events-none"
          >
            First Name
          </label>
          <div className="flex items-center text-white px-3 py-1">
            <input
              type="text"
              name="firstname"
              id="firstname"
              className="flex-1 bg-transparent focus:outline-none text-lg placeholder-gray-500 mb-2"
              placeholder="First Name"
              required
              autoComplete="off"
              value={data.firstname}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="relative z-0 w-full mb-6 group rounded-md border-2 border-white pt-2">
          <label
            htmlFor="lastname"
            className="text-xs font-semibold tracking-wider uppercase px-3 text-white pointer-events-none"
          >
            Last Name
          </label>
          <div className="flex items-center text-white px-3 py-1">
            <input
              type="text"
              name="lastname"
              id="lastname"
              className="flex-1 bg-transparent focus:outline-none text-lg placeholder-gray-500 mb-2"
              placeholder="Last Name"
              required
              autoComplete="off"
              value={data.lastname}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div className="md:flex md:gap-5">
        <div className="relative z-0 w-full mb-6 group rounded-md border-2 border-white pt-2">
          <label
            htmlFor="email"
            className="text-xs font-semibold tracking-wider uppercase px-3 text-white pointer-events-none"
          >
            Email Address
          </label>
          <div className="flex items-center text-white px-3 py-1">
            <input
              type="email"
              name="email"
              id="email"
              className="flex-1 bg-transparent focus:outline-none text-lg placeholder-gray-500 mb-2"
              placeholder="Your Mail"
              required
              autoComplete="off"
              value={data.email}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div
          className="relative z-20 w-full mb-6 group rounded-md border-2 border-white pt-2"
          ref={containerRef}
        >
          <label
            htmlFor="country"
            className="text-xs font-semibold tracking-wider uppercase px-3 text-white pointer-events-none"
          >
            COUNTRY OF RESIDENCE
          </label>

          <div
            className="flex items-center text-white px-3 py-1 cursor-pointer select-none"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <input
              type="text"
              name="country"
              id="country"
              className="flex-1 bg-transparent focus:outline-none text-lg placeholder-gray-500 mb-2 cursor-pointer"
              placeholder={data.country || 'Select country'}
              value={data.country}
              readOnly
              required
              autoComplete="off"
            />
            <svg
              className={`w-5 h-5 ml-2 text-white transition-transform duration-200 ${
                dropdownOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          {dropdownOpen && (
            <ul className="absolute left-0 right-0 max-h-60 overflow-y-auto bg-black border border-white rounded-md mt-1 z-20">
              {countryList.map((country) => (
                <li
                  key={country}
                  className="px-4 py-2 hover:bg-yellow-400 hover:text-black cursor-pointer"
                  onClick={() => handleCountrySelect(country)}
                >
                  {country}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="md:flex md:gap-5">
        <div className="relative z-0 w-full mb-6 group rounded-md border-2 border-white pt-2">
          <label
            htmlFor="city"
            className="text-xs font-semibold tracking-wider uppercase px-3 text-white pointer-events-none"
          >
            CITY OF RESIDENCE
          </label>
          <div className="flex items-center text-white px-3 py-1">
            <input
              type="text"
              name="city"
              id="city"
              className="flex-1 bg-transparent focus:outline-none text-lg placeholder-gray-500 mb-2"
              placeholder="city"
              required
              autoComplete="off"
              value={data.city}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="relative z-0 w-full mb-6 group rounded-md border-2 border-white pt-2">
          <label
            htmlFor="address"
            className="text-xs font-semibold tracking-wider uppercase px-3 text-white pointer-events-none"
          >
            Address
          </label>
          <div className="flex items-center text-white px-3 py-1">
            <input
              type="text"
              name="address"
              id="address"
              className="flex-1 bg-transparent focus:outline-none text-lg placeholder-gray-500 mb-2"
              placeholder="address"
              required
              autoComplete="off"
              value={data.address}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div className="md:flex md:gap-5">
        <div className="relative z-0 w-full mb-6 group rounded-md border-2 border-white pt-2">
          <label
            htmlFor="zip"
            className="text-xs font-semibold tracking-wider uppercase px-3 text-white pointer-events-none"
          >
            ZIP/POSTAL CODE
          </label>
          <div className="flex items-center text-white px-3 py-1">
            <input
              type="text"
              name="zip"
              id="zip"
              className="flex-1 bg-transparent focus:outline-none text-lg placeholder-gray-500 mb-2"
              placeholder="zip"
              required
              autoComplete="off"
              value={data.zip}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="relative z-0 w-full mb-6 group rounded-md border-2 border-white pt-2">
          <label
            htmlFor="address2"
            className="text-xs font-semibold tracking-wider uppercase px-3 text-white pointer-events-none"
          >
            ADDRESS #2 (OPTIONAL)
          </label>
          <div className="flex items-center text-white px-3 py-1">
            <input
              type="text"
              name="address2"
              id="address2"
              className="flex-1 bg-transparent focus:outline-none text-lg placeholder-gray-500 mb-2"
              placeholder="address2"
              autoComplete="off"
              value={data.address2}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
