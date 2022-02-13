const { log } = require('console');
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const api = require('./routes/index.js');
//const test = require('./db/db.json')

app.use(express.static('public'));

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);


// GET route for homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
});

// GET route for notes page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// GET route for all other inputs
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
});

// Server to listen at PORT
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);