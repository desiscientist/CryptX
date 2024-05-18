const express = require('express');
const app = express();

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Define a new route
app.get('/about', (req, res) => {
    res.send('About Us');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
