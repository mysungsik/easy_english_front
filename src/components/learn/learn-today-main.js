import { useEffect, useState } from "react"
import style from "./learn-today.module.css"

const LearnTodayMain = () =>{

    const [question, setQuestion] = useState({})
    const [hintLevel, setHintLevel] = useState(0)

    useEffect(()=>{
        setQuestion({
            word: 'took',
            word_answer: '빼다',
            example: 'I took off mt rings to wash my hands and forgot to took them back on',
            example_answer: '반지를 빼고 손을 씻고 나서 다시 끼는 것을 깜빡했어'
        })
    },[])
    
    // 힌트생성
    const showHint = ()=>{
        if (hintLevel < 1 ){
            setHintLevel(hintLevel + 1)
        }else{
            setHintLevel(0)
            // TODO: 다음 문제로 넘어가기
        }
    }

    // 음성 출력
    const speechHint = ()=>{
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = question.example;
        utterance.lang = 'en-US'; // 언어 설정 (미국 영어)
        utterance.rate = 0.8; // 속도 설정 (1이 기본)
        utterance.pitch = 1.1; // 음높이 설정 (1이 기본)
        speechSynthesis.speak(utterance);
    }
    

    // word의 길이에 따른 input 너비 계산 함수
    const getInputWidth = (wordLength) => {
        return wordLength * 10 + 'px'; // 1글자당 10px로 가정
    };

    return (
        <section className={`${style['learntoday-main-section']}`}>
            <div className={`d-flex ${style['word-info-div']}`}>
                <div className={`d-flex`}>
                    <p>레벨 2</p>
                    <button> 단어 저장</button>
                </div>
                <div>
                    <button> 예문신고 </button>
                </div>
            </div>
            <div className={`${style['word-question-div']} base__lorange`}>
                <p>
                    {question.example_answer}
                </p>
                <p>
                    {('word' in question) ? question.example.split(' ').map(word => {
                        // 띄어쓰기로 분류 후 match 
                        // new RegExp('값', [옵션]) -> 'i' 는 대소문자 구별하지않음 옵션
                        const match = word.match(new RegExp(question.word, 'i'));
                        return (
                            <>
                                {match ? (
                                    // match 되면 input 아니라면 기본 word 표시
                                    <input type="text" style={{ width: getInputWidth(question.word.length) }}/>
                                ) : (
                                    word
                                )}
                                {' '}
                            </>
                        );
                    }) : ''}
                </p>
            </div>

            <div className={`d-flex ${style['word-hint-div']}`}>
                {hintLevel == 0 && <button onClick={()=>showHint()}>힌트</button>}
                {hintLevel == 1 && <button onClick={()=>showHint()}>정답보기</button>}
                
                <button onClick={()=>speechHint()}> 음성힌트 </button>
            </div>
        </section>        
    )
}

export default LearnTodayMain;
