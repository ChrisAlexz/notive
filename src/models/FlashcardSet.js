const mongoose = require('mongoose');

const FlashcardSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, required: true },
    flashcards: [
        {
            front: String,
            back: String
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FlashcardSet', FlashcardSchema);