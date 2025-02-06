// routes/flashcardRoutes.js
const express = require('express');
const router = express.Router();
const FlashcardSet = require('../models/FlashcardSet');

// CREATE a new flashcard set
router.post('/', async (req, res) => {
  try {
    const newSet = new FlashcardSet(req.body);
    await newSet.save();
    res.status(201).json({
      message: "Flashcard set saved successfully!",
      newSet
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all flashcard sets
router.get('/', async (req, res) => {
  try {
    const sets = await FlashcardSet.find();
    res.json(sets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE an entire flashcard set by ID (optional)
router.delete('/:id', async (req, res) => {
  try {
    await FlashcardSet.findByIdAndDelete(req.params.id);
    res.json({ message: "Flashcard set deleted!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a single card from a flashcard set by array index
router.delete('/:id/card/:cardIndex', async (req, res) => {
  try {
    const { id, cardIndex } = req.params;
    const set = await FlashcardSet.findById(id); 
    if (!set) {
      return res.status(404).json({ error: 'Flashcard set not found' });
    }

    // Remove the card at 'cardIndex' from the array
    set.flashcards.splice(cardIndex, 1);
    await set.save();

    res.json({ message: 'Flashcard removed from the set' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
