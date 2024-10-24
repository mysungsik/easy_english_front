import React, { useEffect, useState } from "react";
import style from "./page-hangmain-game.module.css"; // Assuming you're using CSS modules

// Secret word for the game
const words = ["REACT", "JAVASCRIPT", "HTML", "CSS", "COMPONENT"];
const hints = [
  ["A JavaScript library", "Developed by Facebook", "Used for building UIs", "Based on components", "Uses JSX", "Popular with front-end devs", "Often used with hooks"],
  ["Used in front-end and back-end development", "Often combined with HTML and CSS", "Supports functional and object-oriented styles", "Part of the web's core technologies", "Has first-class functions", "Can run in browsers and servers", "Asynchronous operations"],
  ["Markup language", "Used to structure web pages", "Works with CSS and JS", "Has elements and tags", "Fundamental to web development", "Defines document structure", "Used for building web content"],
  ["Style sheet language", "Used for web design", "Works with HTML", "Controls the layout", "Defines colors, fonts, etc.", "Supports responsive design", "Fundamental for web appearance"],
  ["Reusable building blocks", "Used in UI libraries", "Encapsulates behavior and UI", "Commonly used in React", "Helps organize code", "Allows composition", "Enhances maintainability"],
];

const UFOGame = () => {
  const randomIndex = Math.floor(Math.random() * words.length);
  const [currentWordIndex, setCurrentWordIndex] = useState(randomIndex);
  const secretWord = words[currentWordIndex];
  const wordHints = hints[currentWordIndex];

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [hintIndex, setHintIndex] = useState(0);
  const [input, setInput] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const handleGuess = () => {
    const letter = input.toUpperCase();
    if (letter && !guessedLetters.includes(letter) && !gameOver && !gameWon) {
      setGuessedLetters((prev) => [...prev, letter]);

      if (!secretWord.includes(letter)) {
        const newIncorrectGuesses = incorrectGuesses + 1;
        setIncorrectGuesses(newIncorrectGuesses);
        if (newIncorrectGuesses >= 7) {
          setGameOver(true);
        } else {
          setHintIndex((prev) => prev + 1);
        }
      } else {
        checkWin();
      }
    }
    setInput("");
  };

  const checkWin = () => {
    const allGuessed = secretWord.split("").every((letter) =>
      guessedLetters.includes(letter)
    );
    if (allGuessed) {
      setGameWon(true);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleHintClick = () => {
    if (!gameOver && !gameWon && hintsUsed < 7) {
      setHintsUsed(hintsUsed + 1);
      setHintIndex(hintsUsed + 1); // Extend the beam with hints
      setShowHint(true);
    }

    // Check if hints lead to loss condition
    if (hintsUsed + 1 >= 7) {
      setGameOver(true);
    }
  };

  const handleNewGame = () => {
    const newIndex = Math.floor(Math.random() * words.length);
    setCurrentWordIndex(newIndex); // New word
    setGuessedLetters([]);
    setIncorrectGuesses(0);
    setHintIndex(0);
    setHintsUsed(0);
    setGameOver(false);
    setGameWon(false);
    setShowHint(false);
  };

  return (
    <div className={style['game-container']}>
      <h1>UFO Game - Guess the Word</h1>

      <div className={style['word-display']}>
        {secretWord.split("").map((letter, index) => (
          <span key={index} className={style['letter']}>
            {guessedLetters.includes(letter) ? letter : "_"}
          </span>
        ))}
      </div>

      <div className={style['game-info']}>
        {showHint && <p>Hint: {wordHints[hintIndex]}</p>}
        <p>Guessed Letters: {guessedLetters.join(", ")}</p>
      </div>

      {!gameOver && !gameWon && (
        <>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            maxLength="1"
            placeholder="Guess a letter"
          />
          <button onClick={handleGuess}>Guess</button>
          <button onClick={handleHintClick}>Show Hint</button>
        </>
      )}

      {gameWon && (
        <div>
          <h2 className={style['success-animation']}>Congratulations! You Won!</h2>
          <button onClick={handleNewGame}>New Game</button>
        </div>
      )}
      {gameOver && (
        <div>
          <h2 className={style['failure-animation']}>Game Over! The UFO abducted the human!</h2>
          <button onClick={handleNewGame}>New Game</button>
        </div>
      )}

      <div className={`${style['ufo-container']} ${gameOver ? style['ufo-abduct'] : ''} ${gameWon ? style['ufo-dance'] : ''}`}>
        <div className={style['ufo']}>
          <p>UFO</p>
        </div>
        <div className={style['beam-container']}>
          {Array(incorrectGuesses + hintsUsed).fill(0).map((_, index) => (
            <div key={index} className={style['beam']}></div>
          ))}
        </div>
        <div className={`${style['human']} ${gameOver ? style['abducted'] : ''}`}>
          <p>HUMAN</p>
        </div>
      </div>
    </div>
  );
};

export default UFOGame;
