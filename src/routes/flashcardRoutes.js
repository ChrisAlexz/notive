// routes/flashcardRoutes.js
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
    res.status(201).json({ message: 'Flashcard set saved successfully!', newSet });
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

/* 
  NEW: GET a single flashcard set by ID
  This is crucial if you want to edit or display one specific set.
*/
router.get(':/id', async (req,res)=> {
  try {
    const {id} = req.params;
    const set = await FlashcardSet.findById(id)
    if (!set) {
      return res.status(404).json({error:"flashcard set not found"})
    }
    res.json(set)
  } catch(error) {
    res.status(500).json({error: error.message})
  }

})

/* 
  NEW: UPDATE an existing flashcard set
  This allows editing the set's title, type, or flashcards array.
*/

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // We assume req.body contains { title, type, flashcards, ... } etc.
    const updatedSet = await FlashcardSet.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedSet) {
      return res.status(404).json({ error: "Flashcard set not found" });
    }

    res.json({
      message: "Flashcard set updated successfully!",
      updatedSet
    });
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
