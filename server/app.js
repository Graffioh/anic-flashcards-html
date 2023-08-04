import express from 'express';

import { getAllFlashcards, createFlashcard} from './database.js';

const app = express();

app.use(express.json());

// GET all flashcards
app.get('/flashcards', async (req, res) => {
    const cards = await getAllFlashcards();
    res.send(cards);
});

// POST one flashcard
app.post('/flashcards', async (req, res) => {
    const {front, rear} = req.body;
    const card = await createFlashcard(front, rear);
    res.status(201).send(card);
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, () => {
    console.log('Server listening on port 8080');
});