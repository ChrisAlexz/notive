//server.js
const express = require('express');
const path = require('path');
const app = express();
const cardRoutes = require('./routes/cardRoutes'); // Adjust the path as necessary

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/cards', cardRoutes); // Prefix API routes with /api

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// The "catchall" handler: for any request that doesn't match an API route, serve the React app's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});