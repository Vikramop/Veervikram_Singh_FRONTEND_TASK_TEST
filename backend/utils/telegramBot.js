require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

const User = require('../modals/User');
const otpService = require('../service/otpService');

// Utility to send messages and OTPS
exports.sendOTP = async (chatId, otp) => {
  try {
    const message = `🔐 Your OTP is: *${otp}*\nIt expires in 5 minutes.`;
    await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
  } catch (err) {
    console.error('Telegram sendMessage error:', err.message);
  }
};

// User starts interaction with the bot
bot.onText(/\/start link_(.+)/, async (msg, match) => {
  const chatId = String(msg.chat.id);
  const phoneNumber = match[1].trim(); // taken from the deep link

  try {
    // 1. Prevent re-use of Telegram account
    const existing = await User.findOne({ telegramChatId: chatId });
    if (existing && existing.phoneNumber !== phoneNumber) {
      return bot.sendMessage(
        chatId,
        `❌ This Telegram account is already linked to another phone number: *${existing.phoneNumber}*`,
        { parse_mode: 'Markdown' }
      );
    }

    // 2. Find the user by phone number
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return bot.sendMessage(
        chatId,
        '❌ Phone number not found. Please register first.'
      );
    }

    // 3. Link Telegram account
    user.telegramChatId = chatId;
    user.isTelegramLinked = true;
    await user.save();

    // 5. Confirmation
    bot.sendMessage(
      chatId,
      `✅ Telegram linked successfully to phone number *${phoneNumber}*`,
      {
        parse_mode: 'Markdown',
      }
    );
  } catch (err) {
    console.error('Linking error:', err);
    bot.sendMessage(
      chatId,
      '❌ Something went wrong while linking your Telegram.'
    );
  }
});

// Handle /link <username> command for user to link Telegram after signup
bot.onText(/\/link (.+)/, async (msg, match) => {
  const chatId = String(msg.chat.id);
  const username = match[1];

  // Check if Telegram ID already linked to another user
  const existing = await User.findOne({ telegramChatId: chatId });
  if (existing && existing.username !== username) {
    return bot.sendMessage(
      chatId,
      `❌ This Telegram account is already linked to another username: *${existing.username}*`,
      { parse_mode: 'Markdown' }
    );
  }

  // Find the user that wants to link
  const user = await User.findOne({ username: username });
  if (!user) {
    return bot.sendMessage(
      chatId,
      '❌ Username not found. Please sign up first on our website/app.'
    );
  }

  // Link Telegram to user account
  user.telegramChatId = chatId;
  user.isTelegramLinked = true;
  await user.save();

  await bot.sendMessage(
    chatId,
    `✅ Telegram linked successfully to *${username}*`,
    {
      parse_mode: 'Markdown',
    }
  );
});
