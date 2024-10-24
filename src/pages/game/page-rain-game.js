import React, { useState, useEffect } from "react";
import style from "./page-rain-game.module.css"; // Assuming you're using CSS modules
const wordList = ["apple", "banana", "orange", "grape", "melon"];

const FallingWordsGame = () => {
    const [fallingWords, setFallingWords] = useState([]);
    const [input, setInput] = useState("");
    const [gameOver, setGameOver] = useState(false);

    // Function to add words periodically
    useEffect(() => {
        const interval = setInterval(() => {
            if (!gameOver) {
                const randomWord = wordList[Math.floor(Math.random() * wordList.length)]; // 단어 선택
                const randomLeft = Math.floor(Math.random() * 83); // 떨어지는 가로범위
                setFallingWords((prevWords) => [
                    ...prevWords,
                    { word: randomWord, top: 0, left: randomLeft, id: Date.now() },
                ]);
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [gameOver]);

    // Animation effect for falling words
    useEffect(() => {
        const fallingInterval = setInterval(() => {
            setFallingWords((prevWords) =>
                prevWords.map((wordObj) => {
                    if (wordObj.top >= 90) {
                        setGameOver(true);
                        clearInterval(fallingInterval);
                    }
                    return { ...wordObj, top: wordObj.top + 0.2 }; // 떨어지는 칸수
                })
            );
        }, 25); // 떨어지는 칸수의 주기

        return () => clearInterval(fallingInterval);
    }, []);

    // Handle input changes
    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    // Remove the word from the screen when entered
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            setFallingWords((prevWords) =>
                prevWords.filter((wordObj) => wordObj.word !== input)
            );
            setInput("");
        }
    };

    return (
        <div className={style['game-container']}>
            {!gameOver ? (
                <>
                    <div className={style['falling-words']}>
                        {fallingWords.map((wordObj) => (
                            <div
                                key={wordObj.id}
                                className={style['falling-word']}
                                style={{ top: `${wordObj.top}%`, left: `${wordObj.left}%` }} // Apply horizontal position
                            >
                                {wordObj.word}
                            </div>
                        ))}
                    </div>
                    <input
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        className={style['word-input']}
                        placeholder="Type the word here"
                    />
                </>
            ) : (
                <h1 className={style['game-over']}>Game Over! 😢</h1>
            )}
        </div>
    );
};

export default FallingWordsGame;
