const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Login & identity
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  referralCode: { type: String, default: null },
  passcode: {
    type: String,
    required: true,
  },

  telegramChatId: { type: String },
  isTelegramLinked: { type: Boolean, default: false },

  // Profile information
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  email: { type: String, default: '' },
  country: { type: String, default: '' },
  city: { type: String, default: '' },
  address: { type: String, default: '' },
  address2: { type: String, default: '' },
  zip: { type: String, default: '' },

  // Uploaded photos (store URLs or file references)
  photoOfIdentity: { type: String, default: '' },
  photoOfUserWithIdentity: { type: String, default: '' },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
