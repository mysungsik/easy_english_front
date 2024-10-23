import { useEffect, useLayoutEffect, useState } from "react"
import style from "./learn-today.module.css"
import axiosInstance from "../../config/axiosConfig"
import {useNavigate} from "react-router-dom"


const LearnTodayMain = ({user}) =>{
    const [question, setQuestion] = useState({})
    const [hintLevel, setHintLevel] = useState(0)
    const [answer, setAnswer] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useLayoutEffect(()=>{
        // 로그인유저가 존재할때 데이터 가져오기
        if(Object.keys(user).length > 0){
            getWord(false)
        }
    },[])

    useEffect(()=>{
        showHint()
    },[hintLevel])

    // 데이터가져왔으면 Loading 상태 종료
    useEffect(()=>{
        setLoading(false)
    },[question])

    // 데이터 가져오기
    const getWord = async (isCorrect) =>{
        setLoading(true)
        // 초기 데이터 가져오기
        if (!isCorrect){
            const response = await axiosInstance.get(`/learn/getCurrentWordForMemeber?memberNo=${user.memberNo}`);

            if (response === ""){
                alert("오늘의 할당량이 끝났습니다");
                window.location.replace("/")
            }else{
                setQuestion(response)
            }
        }

        // 정답 제출시 다음 데이터 가져오기
        if (isCorrect){
            const response = await axiosInstance.get(`/learn/getCurrentWordForMemeber?memberNo=${user.memberNo}&currentWordId=${question.wordId}`)

            if (response === ""){
                alert("오늘의 할당량이 끝났습니다");
                window.location.replace("/")
            }else{
                setQuestion(response)
            }
        }
    }

    
    // word의 길이에 따른 input 너비 계산 함수
    const getInputWidth = (wordLength) => {
        return wordLength * 12 + 'px'; // 1글자당 10px로 가정
    };

    // 힌트생성
    const handleHintCnt = ()=>{
        hintLevel < 2 ? setHintLevel(hintLevel + 1) : setHintLevel(0)
    }

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

    const resetInput = () =>{
        setAnswer("")
        setHintLevel(0)
    }

    return (
        <section className={`${style['learntoday-main-section']}`}>
            {loading && <div> 다음 문장 생성중... </div>}
            <div className={`d-flex ${style['word-info-div']}`}>
                <div className={`d-flex`}>
                    <p>레벨 {question.wordId}</p>
                    <button> 단어 저장</button>
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
                            const match = word.match(new RegExp(question.wordSpell, 'i'));
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
                
                <button onClick={()=>speechHint()}> 음성힌트 </button>
            </div>
        </section>
    )
}

export default LearnTodayMain;
