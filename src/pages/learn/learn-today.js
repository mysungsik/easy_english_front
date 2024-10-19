import { useContext } from "react";
import LearnTodayMain from "../../components/learn/learn-today-main"
import LearnTodaySide from "../../components/learn/learn-today-side"
import UserContext from "../../context/userContext";
import { useNavigate } from "react-router-dom"


const LearnToday = () => {
    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    
    if(!Object.keys(user).length > 0){
        alert("로그인 후 이용해주세요")
        navigate("/login")
    }

    return (
        <div className="learntoday-page d-flex">
            <LearnTodaySide/>
            <LearnTodayMain/>
        </div>

    )
}
export default LearnToday
