const { log } = require('console');
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(express.static('public'));

// Path to show index.html or homepage
app.get('/', (req, res) => 
res.sendFile(path.join(__dirname, 'public/index.html'))
);

// Path to show notes.html
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// Used to handle all other inputs that does not match any other page and be responsed with the homepage, index.html.
app.get('/*', (req, res) => 
res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
