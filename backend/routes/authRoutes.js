const express = require('express');
const router = express.Router();
const authController = require('../controller/authController.jsx');

// Signup
router.post('/signup', authController.signup);

// Request OTP
router.post('/request-otp', authController.requestOtp);

// Passcode Login
router.post('/login-passcode', authController.loginWithPasscode);
router.post('/login-telegram', authController.loginWithOtpOnly);

// Telegram OTP Login
router.post('/verify-otp', authController.verifyOtpHandler);

// Get Profile (Protected)
router.get('/profile', authController.getProfile);

module.exports = router;
