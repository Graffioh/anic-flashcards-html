import express from 'express';
import cors from 'cors';

import { deleteFlashcard, getAllFlashcards, insertFlashcard} from './database.js';

const app = express();

// // Weird CORS thing
const corsOptions ={
   origin:'*', 
   credentials:true,            
   optionSuccessStatus:200,
}

// Middlewares
app.use(cors(corsOptions))
app.use(express.json());

// GET all flashcards
app.get('/flashcards', async (req, res) => {
    const cards = await getAllFlashcards();
    // Weird CORS thing
    res.send(cards);
});

// POST one flashcard
app.post('/flashcards', async (req, res) => {
    const {front, rear} = req.body;
    const card = await insertFlashcard(front, rear);
    // Weird CORS thing
    res.status(201).send(card);
});

// DELETE one flashcard
// ...
app.delete('/flashcards/:id', async (req, res) => {
    const id = req.params.id
    const deletedCard = await deleteFlashcard(id);
    res.send(deletedCard);
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, () => {
    console.log('Server listening on port 8080');
});