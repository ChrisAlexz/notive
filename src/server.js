// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const flashcardRoutes = require('./routes/flashcardRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas using your connection string
mongoose.connect(
  'mongodb+srv://Hazuh:escalon11@notive.8w1z2.mongodb.net/notive-flashcard?retryWrites=true&w=majority&appName=notive'
)
  .then(() => console.log('MongoDB (Atlas) connected'))
  .catch((err) => console.error('Error connecting to MongoDB Atlas:', err));

// Use the flashcard routes
app.use('/flashcards', flashcardRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
