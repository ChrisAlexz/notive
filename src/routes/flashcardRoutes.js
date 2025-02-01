const express = require('express');
const router = express.Router();
const FlashcardSet = require('../models/FlashcardSet');

// Create a new flashcard set
router.post('/', async (req, res) => {
    try {
        const newSet = new FlashcardSet(req.body);
        await newSet.save();
        res.status(201).json({ message: "Flashcard set saved successfully!", newSet });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all flashcard sets
router.get('/', async (req, res) => {
    try {
        const sets = await FlashcardSet.find();
        res.json(sets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a flashcard set
router.delete('/:id', async (req, res) => {
    try {
        await FlashcardSet.findByIdAndDelete(req.params.id);
        res.json({ message: "Flashcard set deleted!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
