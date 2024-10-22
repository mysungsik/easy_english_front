import { useLayoutEffect } from "react";
import LearnTodayMain from "../../components/learn/learn-today-main"
import LearnTodaySide from "../../components/learn/learn-today-side"
import { useNavigate } from "react-router-dom"

const LearnToday = ({user}) => {
    const navigate = useNavigate();

    // useLayoutEffect 를 통해 화면 깜빡임 제거
    useLayoutEffect(()=>{
        if(!Object.keys(user).length > 0){
            alert("로그인 후 이용해주세요")
            navigate("/login", {replace:true})
        }
    },[user])

    return (
        <div className="learntoday-page d-flex">
            <LearnTodaySide user={user}/>
            <LearnTodayMain user={user}/>
        </div>
    )
}
export default LearnToday
