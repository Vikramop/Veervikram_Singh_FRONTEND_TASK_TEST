const jwt = require('jsonwebtoken');
const authService = require('../service/authService');
const otpService = require('../service/otpService');
const User = require('../modals/User');
const { sendOTP } = require('../utils/telegramBot');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// 📌 Signup
exports.signup = async (req, res) => {
  try {
    const user = await authService.signup(req.body);
    res.status(201).json({
      message: 'User created',
      name: user.name,
      phoneNumber: user.phoneNumber,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 📌 Request OTP (after linking Telegram)
exports.requestOtp = async (req, res) => {
  console.log('📩 /request-otp called with body:', req.body);

  try {
    const { phoneNumber } = req.body; // Use same unique field you use for linking
    if (!phoneNumber) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.isTelegramLinked || !user.telegramChatId) {
      return res.status(400).json({ error: 'Telegram not linked' });
    }

    const otp = otpService.generateOTP();
    await otpService.storeOTP(user._id, otp);

    console.log(`📤 Sending OTP ${otp} to chatId ${user.telegramChatId}`);
    await otpService.generateOTP(user.telegramChatId, otp);
    await sendOTP(user.telegramChatId, otp);

    res.json({ message: 'OTP sent to Telegram' });
  } catch (err) {
    console.error('❌ Error in /request-otp:', err); // <-- see actual error in console
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

// 📌 Passcode login
exports.loginWithPasscode = async (req, res) => {
  try {
    const { phoneNumber, passcode } = req.body; // ✅ use phoneNumber instead of username

    const { user, token } = await authService.loginWithPasscode(
      phoneNumber,
      passcode
    );

    res.json({ token, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 📌 Telegram OTP login
exports.loginWithOtpOnly = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const { user } = await authService.loginWithOtpOnly(phoneNumber);

    const otp = otpService.generateOTP();
    await otpService.storeOTP(user._id, otp);
    await sendOTP(user.telegramChatId, otp);

    return res.status(200).json({
      msg: 'Login OTP sent to your Telegram. Please verify to get your token.',
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 📌 Protected Profile
exports.getProfile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No auth token' });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await authService.getUserProfile(decoded.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

exports.verifyOtpHandler = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;

    // Find the user by phone number
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const result = await otpService.validateOTP(phoneNumber, otp);

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
