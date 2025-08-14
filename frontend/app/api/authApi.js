// src/api/authApi.js
const BASE_URL = 'http://localhost:5000/api/auth'; // Your backend's base URL

// SIGNUP
export async function signup(userData) {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return res.json();
}

// REQUEST OTP
export async function requestOtp(phoneNumber) {
  const res = await fetch(`${BASE_URL}/request-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber }),
  });
  return res.json();
}

// VERIFY OTP
export async function verifyOtp(phoneNumber, otp) {
  const res = await fetch(`${BASE_URL}/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber, otp }),
  });
  return res.json();
}

export async function loginWithPasscode(data) {
  // data = { phoneNumber: '...', passcode: '...' }
  const res = await fetch(`${BASE_URL}/login-passcode`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function loginWithOtpOnly(data) {
  // data = { phoneNumber: '...', otp: '...' }
  const res = await fetch(`${BASE_URL}/login-telegram`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getProfile() {
  const token = localStorage.getItem('authToken'); // or wherever you store it

  const res = await fetch(`${BASE_URL}/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  return res.json();
}

export async function updateProfile(profileData) {
  const token = localStorage.getItem('authToken'); // or wherever you store it

  const res = await fetch(`${BASE_URL}/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(profileData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Failed to update profile');
  }

  return data; // returns the updated user profile
}
