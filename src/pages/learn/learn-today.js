import { useLayoutEffect, useState } from "react";
import LearnTodayMain from "../../components/learn/learn-today-main"
import LearnTodaySide from "../../components/learn/learn-today-side"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../config/axiosConfig";

const LearnToday = ({user}) => {
    const [question, setQuestion] = useState({})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    // useLayoutEffect 를 통해 화면 깜빡임 제거
    useLayoutEffect(()=>{
        if(!Object.keys(user).length > 0){
            alert("로그인 후 이용해주세요")
            navigate("/login", {replace:true})
        }else{
            getWord(false) 
        }
    },[user])

    // 데이터 가져오기
    const getWord = async (sendAnswer) =>{
        setLoading(true)
        // 초기 데이터 가져오기
        if (!sendAnswer){
            const response = await axiosInstance.get(`/learn/getCurrentWordForMemeber?memberNo=${user.memberNo}`);

            if (response === ""){
                alert("오늘의 할당량이 끝났습니다");
                window.location.replace("/")
            }else{
                setQuestion(response)
                setLoading(false)
            }
        }

        // 정답 제출시 다음 데이터 가져오기
        if (sendAnswer){
            const response = await axiosInstance.get(`/learn/getCurrentWordForMemeber?memberNo=${user.memberNo}&currentWordId=${question.wordId}`)

            if (response === ""){
                alert("오늘의 할당량이 끝났습니다");
                window.location.replace("/")
            }else{
                setQuestion(response)
                setLoading(false)
            }
        }
    }



    return (
        <div className="learntoday-page d-flex">
            <LearnTodaySide user={user}/>
            <LearnTodayMain question={question} loading={loading} getWord={getWord}/>
        </div>
    )
}
export default LearnToday
