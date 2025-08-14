const User = require('../modals/User');
const { sendOTP } = require('../utils/telegramBot');
const otpService = require('./otpService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Hash passcode for security
async function hashPasscode(passcode) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(passcode, salt);
}

// Compare passcodes
async function comparePasscode(inputPasscode, hashedPasscode) {
  return bcrypt.compare(inputPasscode, hashedPasscode);
}

// Signup new user
async function signup(data) {
  // Check for existing user by phone
  const existing = await User.findOne({ phoneNumber: data.phoneNumber });
  if (existing) throw new Error('Phone number already registered');

  if (!/^\d{6}$/.test(String(data.passcode).trim())) {
    throw new Error('Passcode must be exactly 6 digits');
  }

  const hashedPasscode = await hashPasscode(data.passcode);

  const user = new User({
    name: data.name,
    dob: data.dob,
    phoneNumber: data.phoneNumber,
    passcode: hashedPasscode,
    isTelegramLinked: false,
  });

  await user.save();

  return user;
}

// Generate JWT token for user
function generateToken(user) {
  return jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, {
    expiresIn: '7d',
  });
}

async function loginWithPasscode(phoneNumber, passcode) {
  // ✅ Find user by phoneNumber
  const user = await User.findOne({ phoneNumber });
  if (!user) throw new Error('User not found');

  const passcodeMatch = await comparePasscode(passcode, user.passcode);
  if (!passcodeMatch) throw new Error('Incorrect passcode');

  const token = generateToken(user);
  return { user, token };
}

async function loginWithOtpOnly(phoneNumber) {
  const user = await User.findOne({ phoneNumber });
  if (!user) throw new Error('User not found');
  if (!user.isTelegramLinked) throw new Error('Telegram not linked');

  return { user };
}

// Get user profile by ID
async function getUserProfile(userId) {
  return User.findById(userId).select('-passcode');
}

async function updateUserProfile(userId, updates) {
  return User.findByIdAndUpdate(
    userId,
    { $set: updates },
    { new: true }
  ).select('-password -passcode'); // hide sensitive fields
}

module.exports = {
  signup,
  loginWithPasscode,
  loginWithOtpOnly,
  getUserProfile,
  generateToken,
  updateUserProfile,
};
