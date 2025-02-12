const express = require('express');
const router = express.Router();
const FlashcardSet = require('../models/FlashcardSet');

// CREATE a new flashcard set
router.post('/', async (req, res) => {
  try {
    const { title, flashcards } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    if (!flashcards || flashcards.length === 0) {
      return res.status(400).json({ error: 'Must have at least one flashcard' });
    }

    const newSet = new FlashcardSet(req.body);
    await newSet.save();
    return res.status(201).json({ message: 'Flashcard set saved successfully!', newSet });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// GET all flashcard sets
router.get('/', async (req, res) => {
  try {
    const sets = await FlashcardSet.find();
    return res.json(sets);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// GET a single flashcard set by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const set = await FlashcardSet.findById(id);
    if (!set) {
      return res.status(404).json({ error: 'Flashcard set not found' });
    }
    return res.json(set);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// UPDATE an existing flashcard set by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSet = await FlashcardSet.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedSet) {
      return res.status(404).json({ error: 'Flashcard set not found' });
    }
    return res.json({
      message: 'Flashcard set updated successfully!',
      updatedSet
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// DELETE an entire flashcard set
router.delete('/:id', async (req, res) => {
  try {
    await FlashcardSet.findByIdAndDelete(req.params.id);
    return res.json({ message: 'Flashcard set deleted!' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// DELETE a single flashcard from a set by array index
router.delete('/:id/card/:cardIndex', async (req, res) => {
  try {
    const { id, cardIndex } = req.params;
    const set = await FlashcardSet.findById(id);

    if (!set) {
      return res.status(404).json({ error: 'Flashcard set not found' });
    }

    const index = parseInt(cardIndex, 10);
    if (isNaN(index) || index < 0 || index >= set.flashcards.length) {
      return res.status(400).json({ error: 'Invalid flashcard index' });
    }

    // Remove the card at the given index
    set.flashcards.splice(index, 1);
    await set.save();

    return res.json({ message: 'Flashcard removed from the set', updatedSet: set });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
