import { useLayoutEffect, useState } from "react";
import LearnMain from "../../components/learn/learn-main"
import LearnSide from "../../components/learn/learn-side"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../config/axiosConfig";

const PageLearnReview = ({user}) => {
    const [review, setReview] = useState({})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    // useLayoutEffect 를 통해 화면 깜빡임 제거
    useLayoutEffect(()=>{
        if(!Object.keys(user).length > 0){
            alert("로그인 후 이용해주세요")
            navigate("/login", {replace:true})
        }else{
            getWord()
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
            setReview(response.data)
            setLoading(false)
        }
   
    }

    return (
        <div className="learntoday-page d-flex">
            <LearnSide user={user}/>
            <LearnMain question={review} loading={loading} getWord={getWord} title={"단어 복습"}/>
        </div>
    )
}
export default PageLearnReview
