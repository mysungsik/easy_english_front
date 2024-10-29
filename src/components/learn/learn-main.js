import { useEffect, useLayoutEffect, useState } from "react"
import style from "./learn-main.module.css"
import axiosInstance from "../../config/axiosConfig"

const LearnMain = ({question, loading, getWord, answer, setAnswer}) =>{
    
    
    // word의 길이에 따른 input 너비 계산 함수
    const getInputWidth = (wordLength) => {
        return wordLength * 15 + 'px'; // 1글자당 10px로 가정
    };

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
    }

    return (
        <section className={`${style['learn-main-section']} bg__white`}>
            {/* 로딩 생성 */}
            {loading && <div> 다음 문장 생성중... </div>}
            {/* 단어 정보 */}
            <div className={`d-flex ${style['word-info-div']}`}>
                <p className={`${style['word-level']} fs__l fw__b`}>레벨 {question.wordId}</p>
            </div>
            {/* 문제 정보 */}
            <div className={`${style['word-question-div']} bs-all__blue`}>
                <p className={`${style['example-mean']} fs__l`}>
                    {question.exampleMean}
                </p>
                <p className={`${style['example-sentence']}`}>
                    {('wordSpell' in question) ? question.exampleSentence.split(' ').map((word, index) => {
                        //  띄어쓰기로 분류 후 match  // new RegExp('값', [옵션]) -> 'i' 는 대소문자 구별하지않음 옵션
                        const match = word.match(new RegExp(`^${question.wordSpell}$`, 'i'));
                        return (
                            <span key={index}>
                                {match ? (
                                    // match 되면 input 아니라면 기본 word 표시
                                    <input type="text" className={`${style['question-input']} fc__black fs__l bg__llblue br-5`} 
                                        style={{ width: getInputWidth(question.wordSpell.length) }} disabled={true} value={answer}/>
                                ) : (
                                    <span className={`fs__l`}>{word}</span>
                                )}
                                {' '}
                            </span>
                        );
                    }) : ''}
                </p>
            </div>
            {/* 정답 입력 */}
            <div className={`${style['word-answer-div']}`}>
                    <input type="text" className={`${style['answer-input']} fs__l`} name="answer" value={answer} onChange={handleAnswer}/>
                    <button className={`btn-big btn__blue fs__l`} onClick={submitAnswer}> 제출하기 </button>
            </div>
        </section>
    )
}

export default LearnMain;
