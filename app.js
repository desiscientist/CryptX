const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Basic route to render an EJS view
app.get('/', (req, res) => {
  res.render('index', { title: 'Home', message: 'Welcome to my website!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
