'use client';

import React, { useState, useRef } from 'react';
import type { OtpInputProps } from '../../types/auth';

export default function OtpInput({ length = 6, onChangeOtp }: OtpInputProps) {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (value: string, idx: number) => {
    if (!/^[0-9a-zA-Z]?$/.test(value)) return; // Only allow 0-9, a-z, A-Z
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);
    if (onChangeOtp) onChangeOtp(newOtp.join(''));
    // Move to next
    if (value && idx < length - 1) {
      inputs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      if (!otp[idx] && idx > 0) {
        inputs.current[idx - 1]?.focus();
      }
    }
  };

  return (
    <div className="flex gap-3 justify-center my-4">
      {otp.map((digit, idx) => (
        <input
          key={idx}
          ref={(el) => {
            inputs.current[idx] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          className="w-12 h-12 max-sm:w-8 max-sm:h-8 max-sm:text-lg text-2xl font-bold text-center rounded-xl border-2 border-gray-500 focus:outline-none focus:border-yellow-400 bg-[#121213] text-white transition"
          autoFocus={idx === 0}
        />
      ))}
    </div>
  );
}
