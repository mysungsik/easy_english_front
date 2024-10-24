import React, { useState, useEffect, useRef } from "react";
import style from "./game-rain-main.module.css"; // Assuming you're using CSS modules
import { createFallingWordInterval, createWordInterval } from "../../util/createInterval";

// TODO : WordList DB로부터 받아오기
const wordList = ["apple", "banana", "orange", "grape", "melon"];

const GameRainMain = () => {
    const [fallingWords, setFallingWords] = useState([]);
    const [currTime, setCurrTime] = useState(0)
    const [fallingSpeed, setFallingSpeed] = useState(41)
    const [input, setInput] = useState("");
    const [gameStart, setGameStart] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const fallingInterval = useRef(null)
    const wordInterval = useRef(null)
    const timerInterval = useRef(null)

    // 단어 생성 인터벌 생성
    useEffect(() => {
        if (gameStart) {
            wordInterval.current = createWordInterval(wordList, setFallingWords, 2000)
        }
        return () => {clearInterval(wordInterval.current)}
    }, [gameStart]);

    // 내려가는 화면 인터벌 생성
    useEffect(() => {
        if(gameStart){
            fallingInterval.current = createFallingWordInterval(setFallingWords, setGameStart, setGameOver, fallingSpeed)
        }
        return () => {clearInterval(fallingInterval.current)}
    }, [gameStart]);

    // 타이머
    useEffect(()=>{
        if (gameStart){
            timerInterval.current = setInterval(()=>{
                setCurrTime(prev => prev+1)
            },1000)
        }
        return () => {clearInterval(timerInterval.current)}
    },[gameStart])

    // 자동 난이도 조정
    useEffect(()=>{
        if (currTime % 20 === 0 && currTime !== 0){ // 매 20초마다
            if (fallingSpeed > 1){
                // 떨어지는 속도 상승
                setFallingSpeed(prev => prev - 10) 
                clearInterval(fallingInterval.current)
                setTimeout( // useState 의 set 이 먹히게 하기 위해 Timeout 함수와 함께 실행
                    fallingInterval.current = createFallingWordInterval(setFallingWords, setGameStart, setGameOver, fallingSpeed), 1
                )
            } else if (fallingSpeed == 1){
                // 떨어지는 속도가 최대가 된다면 단어 나오는 속도를 1초로 변경
                clearInterval(wordInterval.current)
                setTimeout( // useState 의 set 이 먹히게 하기 위해 Timeout 함수와 함께 실행
                    wordInterval.current = createWordInterval(wordList, setFallingWords, 1000), 1
                )
            }
        }
    },[currTime])

    // 입력창 핸들러
    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    // 입력시 화면 단어 제거
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            setFallingWords((prevWords) =>
                prevWords.filter((wordObj) => wordObj.word !== input)
            );
            setInput("");
        }
    };

    // 게임 시작 및 초기화
    const handleGameStart = () =>{
        setFallingWords([])
        setInput("")
        setGameStart(true)
        setGameOver(false)
        setFallingSpeed(40)
        setCurrTime(0)
    }
    return (
        <div className={style['game-container']}>
            {gameStart ? (
                <>
                    <div>{currTime}</div>

                    <div className={style['falling-words']}>
                        {fallingWords.map((wordObj) => (
                            <div
                                key={wordObj.id}
                                className={style['falling-word']}
                                style={{ top: `${wordObj.top}%`, left: `${wordObj.left}%` }} // 위치를 변경하면서 출력
                            >
                                {wordObj.word}
                            </div>
                        ))}
                    </div>
                    <input
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}
                        className={style['word-input']}
                        placeholder="Type the word here"
                    />
                </>
            ) : (
                <>
                    {gameOver ? <h1 className={style['game-over']}>Game Over! 😢</h1> : <></>}
                    <button onClick={handleGameStart}>게임 시작</button>
                </>
            )}
        </div>
    );
};

export default GameRainMain;
