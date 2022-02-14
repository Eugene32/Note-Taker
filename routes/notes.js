const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');

const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helpers/fsUtils');

// GET Route for retrieving all the notess
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});


// GET Route for a specific notes
notes.get('/:id', (req, res) => {
    const id = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((notes) => notes.id === id);
            return result.length > 0
                ? res.json(result)
                : res.json('No notes with that ID');
        });
});

// DELETE Route for a specific notes
notes.delete('/:id', (req, res) => {
    const id = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            // Make a new array of all notess except the one with the ID provided in the URL
            const result = json.filter((notes) => notes.id !== id);

            // Save that array to the filesystem
            writeToFile('./db/db.json', result);

            // Respond to the DELETE request
            res.json(`Item ${id} has been deleted 🗑️`);
        });
});

// POST Route for a new UX/UI notes
notes.post('/', (req, res) => {
    console.log(req.body);

    const { title, text, } = req.body;

    if (req.body) {
        const newnotes = {
            title,
            text,
            id: uuidv4(),
        };

        readAndAppend(newnotes, './db/db.json');
        res.json(`notes added successfully 🚀`);
    } else {
        res.error('Error in adding notes');
    }
});

module.exports = notes;
