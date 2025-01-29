// cardRoutes.js

const express = require('express');
const router = express.Router();
const cardController = require('./cardController');

// Prefix API routes with /api/cards
router.get('/', cardController.card_index); // Now corresponds to /api/cards/

module.exports = router;