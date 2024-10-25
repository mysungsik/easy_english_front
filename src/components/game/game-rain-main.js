import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import style from "./game-rain-main.module.css"; // Assuming you're using CSS modules
import { createFallingWordInterval, createWordInterval } from "../../util/createInterval";
import axiosInstance from "../../config/axiosConfig";

const GameRainMain = () => {
    const [wordList, setWordList] = useState([])
    const [fallingWords, setFallingWords] = useState([]);
    const [currTime, setCurrTime] = useState(0)
    const [fallingSpeed, setFallingSpeed] = useState(51)
    const [input, setInput] = useState("");
    const [gameStart, setGameStart] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const fallingInterval = useRef(null)
    const wordInterval = useRef(null)
    const timerInterval = useRef(null)

    useEffect(()=>{
        getWord()
    },[])
    
    useEffect(() => {
        if (gameStart) {
            // 화면에 단어 생성하는 인터벌 생성
            wordInterval.current = createWordInterval(wordList, setFallingWords, 2000)
            // 내려가는 애니메이션 발생 인터벌 생성
            fallingInterval.current = createFallingWordInterval(setFallingWords, setGameStart, setGameOver, fallingSpeed)
            // 타이머
            timerInterval.current = setInterval(()=>{
                setCurrTime(prev => prev+1)
            },1000)
        }
        return () => {
                clearInterval(wordInterval.current)
                clearInterval(fallingInterval.current)
                clearInterval(timerInterval.current)
        }
    }, [gameStart]);

    // 자동 난이도 조정
    useEffect(()=>{
        if (currTime % 20 === 0 && currTime !== 0){ // 매 20초마다
            if (fallingSpeed > 1){
                // 떨어지는 속도 상승
                clearInterval(fallingInterval.current)
                // useState 의 비동기에 의해 사용하지 못할 수 있으므로, 수기로 설정
                fallingInterval.current = createFallingWordInterval(setFallingWords, setGameStart, setGameOver, fallingSpeed - 10)
                setFallingSpeed(prev => prev - 10) 
            } else if (fallingSpeed == 1){
                // 떨어지는 속도가 최대가 된다면 단어 나오는 속도를 1초로 변경
                clearInterval(wordInterval.current)
                wordInterval.current = createWordInterval(wordList, setFallingWords, 1000)
            
            }
        }
    },[currTime])

    // 입력창 핸들러
    const handleInputChange = useCallback((e)=> {
        setInput(e.target.value);
    },[]);

    // 입력시 화면 단어 제거
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            setFallingWords((prevWords) =>
                prevWords.filter((wordObj) => wordObj.word !== input)
            );
            setInput("");
        }
    };

    const getWord = useCallback(async ()=>{
            const response = await axiosInstance.get("/game/rain/getWordsForRain")
    
            if (response.data !== "" || response.data !== null){
                setWordList(response.data)
            }else{
                alert(response.message)
            }
        },[])
    
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
