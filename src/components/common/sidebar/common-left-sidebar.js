import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import style from "./common-left-sidebar.module.css"

const CommonLeftSidebar = ({user, title}) =>{
    const navigate = useNavigate()
    
    const [time, setTime] = useState(0)
    const [timer, setTimer] = useState()

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
        <section className={`${style['common-side-section']}`}>
            <div className={`${style['common-side-top']} bg__blue`}>
                <div className={`${style['navigate-div']} mt-8`}>
                    <button className={`btn-small btn__white`} onClick={()=>navigate(-1)}> 뒤로가기 </button>
                </div>
    
                {/* 설명 칸 */}
                <div className={`${style['common-side-info-div']} mt-8`}>
                    <p className={`${style['info-title']} fs-header__s fw__b fc__white mt-12`}>{title}</p>
                    <p className={`${style['info-description']} fs__s fc__white mt-12`}>
                        실생활에서 가장 잘 쓰이는 단어로 공부해요 <br/>
                        4500개의 필수 단어와 <br/>
                        AI가 생성해주는 예문을 통해 <br/>
                        여러분들들의 영어실력을 키우세요! <br/>
                    </p>
                </div>
                {/* 로그인 유저 정보 */}
                <div className={`${style['user-info-div']}`}>
                    <div className={`${style['user-img']}`}>
                        <img src="/profile_temp/user_img1.jpg" />
                    </div>
                    {Object.keys(user).length > 0 ?
                        <div className={`${style['user-nickname-div']} bg__white`}>
                            <p className={`fs__m fw__b`}>{user.memberNickname} 님</p>
                            <p className={`fs__m`}> 반가워요!</p>
                        </div>
                    : 
                        <div className={`${style['user-nickname-div']} fc__white`}>
                            로그인하시면 기록할수있어요!
                        </div>
                    }
                </div>
            </div>
            <div className={`${style['common-side-bottom']} bg__blue`}>
                <div className={`${style['time-info']}`} >
                    <p className={`${style['time-title']} fs-header__s fw__b fc__white`} > 경과 시간 </p>
                    <p className={`${style['time-content']} fs-header__s fw__b bg__white bs__gray`}> {time} 초 </p>
                </div>
            </div>
        </section>        
    )

}

export default CommonLeftSidebar;
