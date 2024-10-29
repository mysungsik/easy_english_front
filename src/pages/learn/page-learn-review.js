import { useLayoutEffect, useState, useEffect } from "react";
import LearnMain from "../../components/learn/learn-main"
import CommonLeftSidebar from "../../components/common/sidebar/common-left-sidebar";
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../config/axiosConfig";
import style from "./page-learn.module.css"
import LearnRightSidebar from "../../components/learn/learn-right-sidebar";

const PageLearnReview = ({user}) => {
    const [question, setQuestion] = useState({})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    // Right SideBar용
    const [hintLevel, setHintLevel] = useState(0)
    const [saved, setSaved] = useState(false)
    const [answer, setAnswer] = useState("")

    // 단어장 저장 유무 확인, 힌트 리셋
    useLayoutEffect(()=>{
        if( Object.keys(user).length > 0 && (question.hasOwnProperty("wordId")) ){
            getWordFromRepeatNote(user.memberNo, question.wordId)
        }
        setHintLevel(0)
    },[question])

    // 단어저장 유무 확인 함수
    const getWordFromRepeatNote = async (memberNo, wordId) =>{
        const response = await axiosInstance.get(`/learn/checkWordFromRepeatNote?memberNo=${memberNo}&wordId=${wordId}`)

        console.log(response.data)
        if (response.data >= 1){
            setSaved(true)
        }else if (response.data == 0 || response.data !== null || response.data === ""){
            setSaved(false)
        }
    }

    // 단어장 저장 함수
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

    useEffect(()=>{
        showHint()
    },[hintLevel])

    // 힌트 조작 핸들러
    const handleHintCnt = ()=>{
        hintLevel < 2 ? setHintLevel(hintLevel + 1) : setHintLevel(0)
    }


    // useLayoutEffect 를 통해 화면 깜빡임 제거
    useLayoutEffect(()=>{
        if(!Object.keys(user).length > 0){
            alert("로그인 후 이용해주세요")
            navigate("/login", {replace:true})
        }else{
            getWord(false)
        }
    },[user])

    // 복습 데이터 가져오기
    const getWord = async (sendAnswer) =>{
        setLoading(true)
  
        const response = await axiosInstance.get(`/learn/getRandomWordForReviewByMember?memberNo=${user.memberNo}`);
        if (response.data === "" || response.data === null){
            alert("오늘의 할당량이 끝났습니다");
            window.location.replace("/")
        }else{
            setQuestion(response.data)
            setLoading(false)
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

    const stateSideBar = {
        repeatNoteState : {saved, setSaved, saveWordToRepeatNote, deleteWordToRepeatNote},
        hintState : {hintLevel, setHintLevel, handleHintCnt},
        utilState : {speechHint}
    }



    return (
        <div className={`${style['learnreview-page']}`}>
            <CommonLeftSidebar user={user}/>
            <LearnMain  
                question={question} 
                loading={loading} 
                getWord={getWord}
                answer = {answer} 
                setAnswer = {setAnswer}
            />
            <LearnRightSidebar
                user={user} 
                question={question} 
                loading={loading}
                stateSideBar = {stateSideBar}
            />
        </div>
    )
}
export default PageLearnReview
