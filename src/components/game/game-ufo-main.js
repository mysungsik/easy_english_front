import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import style from "./game-ufo-main.module.css"; // Assuming you're using CSS modules
import axiosInstance from "../../config/axiosConfig";


// GAME : 8 번째 안에 다 맞춰야한다.
const GameUFOMain = () => {
    
    // 단어
    const [secretWord, setSecretWord] = useState("")
    // 힌트
    const [hints, setHints] = useState([])
    const [hintIndex, setHintIndex] = useState(0);
    const [showHint, setShowHint] = useState(false);
    // 단어확인
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [incorrectGuesses, setIncorrectGuesses] = useState(0);
    const [input, setInput] = useState("");
    // 결과    
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [loading, setLoading] = useState(true)

    // 초기 힌트와 단어 생성
    useEffect(() =>{
        getReadyForUfoGame()
    },[])

    // 패배 조건 확인
    useEffect (() =>{
        checkGameOver()
    },[incorrectGuesses, hintIndex])

    // 승리 조건 확인
    useEffect(()=>{
        const win = checkWin()
        {win ? setGameWon(true) : setGameWon(false)};
    },[guessedLetters])

    // 게임 준비 : 단어 및 힌트 생성
    const getReadyForUfoGame = async () =>{
        setLoading(true)
        const response = await axiosInstance.get("/game/ufo/getSecretWordAndHints")

        if(response.hasOwnProperty("hints") && response.hasOwnProperty("word")){
            setSecretWord(response.word.wordSpell.toUpperCase())
            setHints(response.hints)
            setLoading(false)
        }else{
            alert(response.message);
        }

        // setSecretWord("RRCCCREATE")
        // setHints(new Array().fill(0))
    }

    // 정답 제출
    const handleGuess = () => {
        const letter = input.toUpperCase();
        if (letter && !guessedLetters.includes(letter) && !gameOver && !gameWon) {
            setGuessedLetters((prev) => [...prev, letter]);

            if (!secretWord.includes(letter)) {
                const newIncorrectGuesses = incorrectGuesses + 1;
                setIncorrectGuesses(newIncorrectGuesses);
            }
        }
        setInput("");
    };

    // 승리 조건
    const checkWin = useCallback(()=>{
        // SecretWord 의 내부에 있는 단어가, guessedLetters 안에 전부 포함되어있는지 확인
        const correctSet = new Set(secretWord.split(""))
        const guessedSet = new Set(guessedLetters)

        if (correctSet.size != 0 && correctSet.size === guessedSet.size){
            for(let spell of correctSet){
                if (!guessedSet.has(spell)){
                    return false
                }
            }
            return true
        }
    },[secretWord, guessedLetters]) 

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    // 힌트 사용 핸들러
    const handleHintClick = () => {
        if (!gameOver && !gameWon && hintIndex < 7) {
            setHintIndex(hintIndex + 1);        // Extend the beam with hints
            setShowHint(true);
        }
    };

    const checkGameOver = () =>{
        if (incorrectGuesses + hintIndex > 7) {  // 패배조건 : 실패 + 힌트 = 8
            setGameOver(true);
        }
    } 

    const handleNewGame = () => {
        resetGame() // 초기화
        getReadyForUfoGame()    // 새단어 생성
    };

    const resetGame = () =>{
        setGuessedLetters([]);
        setSecretWord("");
        setIncorrectGuesses(0);
        setHintIndex(0);
        setGameOver(false);
        setGameWon(false);
        setShowHint(false);
    }

    return (
        <div className={style['game-container']}>
            {loading ? <p>로딩중 </p> : <></>}
            <h1>UFO Game - Guess the Word</h1>

            <div className={style['word-display']}>
                {secretWord.split("").map((letter, index) => (
                    <span key={index} className={style['letter']}>
                        {guessedLetters.includes(letter) ? letter : "_"}
                    </span>
                ))}
            </div>

            <div className={style['game-info']}>
                {showHint && <p>Hint: {hints[hintIndex - 1]}</p>}
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
                    {new Array(incorrectGuesses + hintIndex).fill(0).map((_, index) => (    // '_' 는 해당 값이 필요없을때의 의미. 오로지 index 만 필요
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

export default GameUFOMain;
