import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./repeat-note-side.module.css"

const RepeatNoteSide = ({user}) =>{
    const navigate = useNavigate()
    
    const [time, setTime] = useState(0)
    const [timer, setTimer] = useState()
    const [wordCnt, setWordCnt] = useState(0)

    // 시간 처리 함수
    const handleTime = () =>{
        clearInterval(timer)
        const interval = setInterval(()=>{
            setTime((prev) => prev+1)
        }, 1000)

        setTimer(interval)
    }
    useEffect(()=>{handleTime()}, [])

    return (
        <section className={`${style['repeat-note-side-section']} base__lblue`}>
            <div className={`${style['navigate-div']}`}>
                <button className={`btn-small__blue`} onClick={()=>navigate(-1)}> 뒤로가기 </button>
            </div>
            <hr/>
            <div className={`${style['user-info-div']}`}>
                <div className={`${style['user-img']}`}>
                    <img src="/profile_temp/user_img1.jpg" />
                </div>
                {Object.keys(user).length > 0 ?
                    <div>
                        <p>{user.memberNickname}</p>
                    </div>

                : 
                    <div className={`${style['user-info']}`}>
                        로그인 후 이용해주세요
                    </div>
                }
            </div>
            <hr/>
            <div className={`${style['repeat-note-info-div']}`}>
                <div className={`${style['repeat-note-info']}`} >
                    <div>
                        <div> 경과시간 </div>
                        <div> 저장된 단어수 </div>
                    </div>
                    <div>
                        <div> {time} 초 </div>
                        <div> {wordCnt} 개 </div>
                    </div>
                </div>
            </div>
        </section>        
    )

}

export default RepeatNoteSide;
