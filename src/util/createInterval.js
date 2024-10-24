// 단어 생성 인터벌 생성
export const createWordInterval = (wordList, setFallingWords, frequency) =>{
    return (
        setInterval(() => {
            const randomWord = wordList[Math.floor(Math.random() * wordList.length)]; // 단어 선택
            const randomLeft = Math.floor(Math.random() * 83); // 떨어지는 가로범위
            setFallingWords((prevWords) => [
                ...prevWords,
                { word: randomWord, top: 0, left: randomLeft, id: Date.now() },
            ]);
        }, frequency)
    )
}

// 떨어지는 단어의 속도 조정 및 패배조건 생성
export const createFallingWordInterval = (setFallingWords, setGameStart, setGameOver, fallingSpeed) =>{
    return (
        setInterval(() => {
            setFallingWords((prevWords) =>
                prevWords.map((wordObj) => {
                    if (wordObj.top >= 90) {    // 패배 조건
                        setGameStart(false);
                        setGameOver(true)
                    }
                    return { ...wordObj, top: wordObj.top + 0.5 }; // 떨어지는 칸수
                })
            );
        }, fallingSpeed) // 떨어지는 칸수의 주기(점차 빨라짐)
    )
}

