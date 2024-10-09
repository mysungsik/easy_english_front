import style from "./learn-today.module.css"
import { useNavigate } from "react-router-dom";

const LearnTodaySide = () =>{
    const navigate = useNavigate()
    
    return (
        <section className={`${style['learntoday-side-section']} base__lblue`}>
            <div className={`${style['navigate-div']}`}>
                <button className={`btn-small__blue`} onClick={()=>navigate(-1)}> 뒤로가기 </button>
            </div>
            <hr/>
            <div className={`${style['user-info-div']}`}>
                <div className={`${style['user-img']}`}>
                    <img src="/profile_temp/user_img1.jpg" />
                </div>
                <div className={`${style['user-info']}`}>
                    로그인 후 이용해주세요
                </div>
            </div>
            <hr/>
            <div className={`${style['learn-info-div']}`}>
                <div className={`${style['learn-info']}`} >
                    <div>
                        <div> 경과시간 </div>
                        <div> 정확도 </div>
                        <div> 현재점수 </div>
                        <div> 최고점수 </div>
                    </div>
                    <div>
                        <div> 22 </div>
                        <div> 100% </div>
                        <div> 22 </div>
                        <div> 22 </div>
                    </div>
                </div>
            </div>
        </section>        
    )

}

export default LearnTodaySide;
