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

    // 승리 조건
    const checkWin = useCallback(() => {
        const correctSet = new Set(secretWord.split(""));
        
        // guessedLetters 중 맞는 글자만으로 새로운 세트를 생성합니다.
        const correctGuessedLetters = guessedLetters.filter((letter) =>
            correctSet.has(letter)
        );
        const guessedSet = new Set(correctGuessedLetters);
    
        // guessedSet의 모든 요소가 correctSet에 포함되는지 확인합니다.
        if (correctSet.size !== 0 &&  correctSet.size === guessedSet.size) {
            return Array.from(correctSet).every((letter) => guessedSet.has(letter));
        }
    
        return false;
    }, [secretWord, guessedLetters]);

    const resetGame = () =>{
        setGuessedLetters([]);
        setSecretWord("");
        setIncorrectGuesses(0);
        setHintIndex(0);
        setGameOver(false);
        setGameWon(false);
        setShowHint(false);
    }


    // 패배 조건 확인
    useEffect (() =>{
        checkGameOver()
    },[incorrectGuesses, hintIndex])

    // 승리 조건 확인
    useEffect(()=>{
        const win = checkWin()
        console.log(win)
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
    }

    // 정답 제출
    const handleEnterKey = (e) => {
        if(e.key == "Enter"){
            handleGuess()
        }
    }
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
    return (
        <div className={style['game-container']}>
            {/* 게임섹션 */}
            <div className={`${style['game-section']} bg-linear__b_black`}>
                <img className={`${style['ufo-background']}`} src="/game/ufo.png"></img>
                <img className={`${style['ufo-background2']}`} src="/game/ufo.png"
                    style={{ height: `${(incorrectGuesses + hintIndex) * 6.5}%` }}></img>

                {/* 힌트 칸 */}
                {loading ? <p> 힌트와 문제 생성중... </p> : <></>}
                <div className={style['hint-div']}> 
                    <p className={`${style['title']} fs__l fw__b`}> 힌트 </p>
                    <p className={`${style['hint']} bg__white`}>
                        {showHint ? hints[hintIndex - 1] : "" }
                    </p>
                </div>

                <div className={style['word-guess-div']}>
                    <p className={`${style['title']} fs__l fw__b`}> 추측한 단어 목록 </p>
                    <p className={`${style['guess-word']} fc__lgray`}>
                        {guessedLetters.length > 0 ? guessedLetters.join(", ") : ""}
                    </p>
                </div>

                {/*  단어 확인 칸 */}
                <div className={style['word-check-div']}>
                    {secretWord.split("").map((letter, index) => (
                        <span key={index} className={style['letter']}>
                            {guessedLetters.includes(letter) ? letter : ""}
                        </span>
                    ))}
                </div>

                {/* 게임 패배시 */}
                {gameOver && (
                    <div>
                        <h2 className={style['failure-animation']}>게임오버! 잡혀가버렸어요 ㅠㅠ!</h2>
                    </div>
                )}

                {/* 게임 승리시 */}
                {gameWon && (
                    <div>
                        <h2 className={style['success-animation']}>축하합니다! 구출에 성공했어요!</h2>
                    </div>
                )}

                {/* 입력칸 */}
                {!gameOver && !gameWon && (
                    <div className={style['input-div']}>
                        <input
                            type="text"
                            value={input}
                            onChange={handleInputChange}
                            onKeyDown={handleEnterKey}
                            maxLength="1"
                        />
                        <button className="btn-small btn__white" onClick={handleGuess}>입력</button>
                    </div>
                )}

                {/* 화면 애니메이션 */}
                <div className={`${style['human-div']} ${gameOver ? style['abducted'] : ''}`}>
                    <img src="/game/sos.png"/>
                </div>
            </div>
            {/* 사이드바 섹션 */}
            <div className={`${style['sidebar-section']} bg-linear__b_black`}>
                <button onClick={handleHintClick}  className={`btn__white btn-medium ml-8 mb-12`}>
                    힌트 확인
                    <img src="/icons/arrow-right__black.png" 
                            className="ml-8" 
                            style={{width : "25px", height : "25px"}}/>
                </button>

                {/* 게임 종료시 */}
                <button onClick={handleNewGame} className={`btn__white btn-medium ml-8 mb-12`}>
                    다시하기
                    <img src="/icons/arrow-right__black.png" 
                            className="ml-8" 
                            style={{width : "25px", height : "25px"}}/>
                </button>
            </div>
        </div>
    );
};

export default GameUFOMain;
