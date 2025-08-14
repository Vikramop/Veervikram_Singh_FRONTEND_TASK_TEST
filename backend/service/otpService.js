const OTP = require('../modals/Otp'); // Ensure correct path spelling - "models"

const User = require('../modals/User');
const jwt = require('jsonwebtoken');
// const { generateToken } = require('./authService.js');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const expiryCutoff = new Date(Date.now() - 5 * 60 * 1000);

// Generate a random 6-digit OTP as a string
exports.generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Store OTP for a user with 5-minute expiry
exports.storeOTP = async (userId, otp) => {
  await OTP.create({
    userId,
    otp,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 min TTL
    used: false,
  });
};

function generateToken(user) {
  return jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, {
    expiresIn: '7d',
  });
}

// Validate OTP - service style (no res here)
exports.validateOTP = async (phoneNumber, inputOtp) => {
  console.log('🔍 Looking up user with phoneNumber:', phoneNumber);

  const user = await User.findOne({ phoneNumber });

  if (!user) {
    throw new Error('User not found');
  }

  console.log('🔍 Checking OTP for userId:', user._id);

  const record = await OTP.findOne({
    userId: user._id,
    used: false,
    createdAt: { $gt: expiryCutoff }, // Not expired
  });

  console.log('📦 Found OTP Record:', record);

  if (!record) {
    throw new Error('Invalid or expired OTP');
  }

  const storedOtp = record.otp.toString().trim();
  const enteredOtp = inputOtp.toString().trim();

  if (storedOtp !== enteredOtp) {
    throw new Error('Invalid or expired OTP');
  }

  // Mark as used or delete
  await OTP.deleteOne({ _id: record._id });
  console.log('✅ OTP validated and deleted.');

  const token = generateToken(user);
  return {
    msg: 'OTP verified',
    token,
  };
};
