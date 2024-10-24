import { useEffect, useLayoutEffect, useState } from "react"
import style from "./learn-today.module.css"
import axiosInstance from "../../config/axiosConfig"

const LearnMain = ({user, question, loading, getWord, title}) =>{
    const [hintLevel, setHintLevel] = useState(0)
    const [saved, setSaved] = useState(false)
    const [answer, setAnswer] = useState("")

    useLayoutEffect(()=>{
        // 단어장 저장 유무 확인
        if( Object.keys(user).length > 0 && (question.hasOwnProperty("wordId")) ){
            console.log("aaa")
            getWordFromRepeatNote(user.memberNo, question.wordId)
        }
    },[question])

    useEffect(()=>{
        showHint()
    },[hintLevel])
    
    // word의 길이에 따른 input 너비 계산 함수
    const getInputWidth = (wordLength) => {
        return wordLength * 12 + 'px'; // 1글자당 10px로 가정
    };

    // 힌트 조작 핸들러
    const handleHintCnt = ()=>{
        hintLevel < 2 ? setHintLevel(hintLevel + 1) : setHintLevel(0)
    }

    // 힌트 확인
    const showHint = () =>{
        if (hintLevel === 0){
            setAnswer("")
        }
        else if (hintLevel === 1 ){
            setAnswer(question.wordSpell.substring(0,1))
        }else{
            setAnswer(question.wordSpell)
        }
    }

    // 음성 출력
    const speechHint = ()=>{
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = question.exampleSentence;
        utterance.lang = 'en-US'; // 언어 설정 (미국 영어)
        utterance.rate = 1.0; // 속도 설정 (1이 기본)
        utterance.pitch = 1.0; // 음높이 설정 (1이 기본)
        speechSynthesis.speak(utterance);
    }

    // 정답 핸들러
    const handleAnswer = (e) =>{
        const value = e.target.value
        setAnswer(value)
    }

    // 정답 제출
    const submitAnswer = () =>{
        if (answer.toLowerCase() == question.wordSpell.toLowerCase()){
            getWord(true)
            resetInput()
            alert("정답입니다!")
        }
        else{
            alert("아까워요! 다시 풀어보세요!")
        }
    }

    // 입력 리셋
    const resetInput = () =>{
        setAnswer("")
        setHintLevel(0)
    }

    // 단어장 저장 유무 확인
    const getWordFromRepeatNote = async (memberNo, wordId) =>{
        const response = await axiosInstance.get(`/learn/checkWordFromRepeatNote?memberNo=${memberNo}&wordId=${wordId}`)

        console.log(response.data)
        if (response.data >= 1){
            setSaved(true)
        }else if (response.data == 0 || response.data !== null || response.data === ""){
            setSaved(false)
        }
    }

    // 단어장 저장
    const saveWordToRepeatNote = async () =>{
        const response = await axiosInstance.post("/learn/saveToRepatNote", {
            memberNo : user.memberNo,
            wordId : question.wordId
        })

        if ( Object.keys(response.data).length > 0){
            setSaved(true)
        }else{
            setSaved(false)
        }

        alert(response.message)
    }

    // 단어장 삭제
    const deleteWordToRepeatNote = async () =>{
        const response = await axiosInstance.delete(`/learn/deleteWordFromRepatNote?memberNo=${user.memberNo}&wordId=${question.wordId}`)

        if (response.data >= 1){
            setSaved(false)
        }else if (response.data == 0 || response.data !== null || response.data === ""){
            setSaved(true)
        }
        alert(response.message)
    }

    return (
        <section className={`${style['learntoday-main-section']}`}>
            <h1 className={`fs-20`}> {title} </h1>
            {loading && <div> 다음 문장 생성중... </div>}
            <div className={`d-flex ${style['word-info-div']}`}>
                <div className={`d-flex`}>
                    <p>레벨 {question.wordId}</p>
                    {saved ? 
                    <button onClick={deleteWordToRepeatNote}> 단어장 빼기</button>
                    :
                    <button onClick={saveWordToRepeatNote}> 단어장 넣기</button>}
                    
                </div>
                <div>
                    <button> 예문신고 </button>
                </div>
            </div>
            <div className={`${style['word-question-div']} base__lorange`}>
                <div>
                    <p>
                        {question.exampleMean}
                    </p>
                    <p>
                        {('wordSpell' in question) ? question.exampleSentence.split(' ').map((word, index) => {
                            // 띄어쓰기로 분류 후 match 
                            // new RegExp('값', [옵션]) -> 'i' 는 대소문자 구별하지않음 옵션
                            const match = word.match(new RegExp(`^${question.wordSpell}$`, 'i'));
                            return (
                                <span key={index}>
                                    {match ? (
                                        // match 되면 input 아니라면 기본 word 표시
                                        <input type="text" className={`${style['questionInput']}`} 
                                            style={{ width: getInputWidth(question.wordSpell.length) }} disabled={true} value={answer}/>
                                    ) : (
                                        <span>{word}</span>
                                    )}
                                    {' '}
                                </span>
                            );
                        }) : ''}
                    </p>
                </div>
                <div>
                    <label htmlFor="answer">정답 입력</label>
                    <input type="text" className={`${style['answerInput']}`} name="answer" value={answer} onChange={handleAnswer}/>
                    <button onClick={submitAnswer}> 제출 </button>
                </div>
            </div>

            <div className={`d-flex ${style['word-hint-div']}`}>
                {hintLevel == 0 && <button onClick={()=>handleHintCnt()}>힌트</button>}
                {hintLevel == 1 && <button onClick={()=>handleHintCnt()}>정답보기</button>}
                {hintLevel == 2 && <button onClick={()=>handleHintCnt()}>다시풀어보기</button>}
                
                <button onClick={speechHint}> 음성힌트 </button>
            </div>
        </section>
    )
}

export default LearnMain;
