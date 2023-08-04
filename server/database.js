// https://www.youtube.com/watch?v=Hej48pi_lOc <- tutorial
import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

export async function getAllFlashcards() {
    const result = await pool.query('SELECT * FROM flashcards');
    return result[0];
}

export async function createFlashcard(front, rear) {
    const result = await pool.query('INSERT INTO flashcards (front, rear) VALUES (?, ?)', [front, rear]);
    return result[0];
}

// async function getFlashcardById(id) {
//     const result = await pool.query('SELECT * FROM flashcards WHERE id = ?', [id]);
//     return result[0];
// }
