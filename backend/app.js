require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const path = require('path');
const multer = require('multer');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Multer setup to receive photo uploads (profile + identity photos)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Create uploads folder or store elsewhere
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Auth routes
app.use('/api/auth', authRoutes);

// Route for uploading identity photos (you can add authentication middleware here)
app.post(
  '/profile/upload',
  upload.fields([
    { name: 'photoOfIdentity' },
    { name: 'photoOfUserWithIdentity' },
  ]),
  (req, res) => {
    const files = req.files;
    if (!files) return res.status(400).json({ error: 'No files uploaded' });

    // For example, respond with saved file paths/URLs
    res.json({
      photoOfIdentity: files.photoOfIdentity
        ? `/uploads/${files.photoOfIdentity[0].filename}`
        : null,
      photoOfUserWithIdentity: files.photoOfUserWithIdentity
        ? `/uploads/${files.photoOfUserWithIdentity[0].filename}`
        : null,
    });
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;
