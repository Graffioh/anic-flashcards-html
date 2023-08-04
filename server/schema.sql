CREATE DATABASE flashcards_db;
USE flashcards_db;

CREATE TABLE flashcards (
  id INT PRIMARY KEY AUTO_INCREMENT,
  front VARCHAR(255) NOT NULL,
  rear VARCHAR(255) NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO flashcards (front, rear) 
VALUES 
('What is the capital of the United States?', 'Washington, D.C.'), 
('What is the capital of France?', 'Paris');