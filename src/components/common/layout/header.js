import { Link } from "react-router-dom"
import style from "./header.module.css"
import { useContext, useRef, useState } from "react"
import UserContext from "../../../context/userContext";

const Header = () => {
    const [navId, setNavId] = useState("");
    const {user, setUser} = useContext(UserContext)
    const hideTimeout = useRef(null); // 타임아웃 저장

    const handleMouseEnter = (id) => {
        // 타임아웃 취소
        clearTimeout(hideTimeout.current); 
        setNavId(id);
    };

    const handleMouseLeave = () => {
        // 일정 시간 후에 네비게이션 숨김
        hideTimeout.current = setTimeout(() => {
            setNavId(""); 
        }, 400);
    };

    const logout = () => {
        localStorage.removeItem("jwt")
        setUser({})
    }

    return (
        <div className={`${style['header-background']}`}>
            <header className={`${navId !== "" ? style['show'] : style['hide']}`}>
                {/* 헤더 상단 */}
                <div className={`${style['header-top']} `}>
                    {/* 로고 및 네비게이션 파트 */}
                    <div className={`${style['header-top-left']}`}>
                        <Link className={`${style['left-logo']}`} to={"/"}>
                            <img className={`${style['logo']}`} src="/logo/logo_main.png" alt="logo"/>
                        </Link>
                        <div className={`${style['left-nav']}`}>
                            <ul className={'d-flex'}>
                                <li className={`fs-20 pointer`} onMouseEnter={() => handleMouseEnter("learn")} onMouseLeave={handleMouseLeave}>
                                    학습하기
                                </li>
                                <li className={`fs-20 pointer`} onMouseEnter={() => handleMouseEnter("game")} onMouseLeave={handleMouseLeave}>
                                    게임하기
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* 유저 로그인 파트 */}
                    {Object.keys(user).length > 0 ?
                        <div>
                            <p> 안녕하세요 {user.memberNickname}</p>
                            <button onClick={logout}> 로그아웃 </button>
                        </div>
                        :
                        <div className={`${style['header-top-right']}`}>
                            <Link to={"/login"} className={`btn-small__blue loginBtn`}> 로그인 </Link>
                        </div>
                    }
                </div>
                {/* 헤더 하단 슬라이드 */}
                <div
                    className={`${style['header-bot']} base__blue`}
                    onMouseEnter={() => handleMouseEnter(navId)}
                    onMouseLeave={handleMouseLeave}
                >
                    {navId === "learn" && (
                        <ul>
                            <li>
                                <Link to={"/learn/today"} className="fc__white"> 오늘의 학습 </Link>
                            </li>
                            <li>
                                <Link to={"/learn/review"} className="fc__white"> 복습 </Link>
                            </li>
                            <li>
                                <Link to={"/learn/repeatNote"} className="fc__white"> 나의 단어장 </Link>
                            </li>
                        </ul>
                    )}
                    {navId === "game" && (
                        <ul>
                            <li>
                                <Link to={"/game/ufo"} className="fc__white"> UFO 게임 </Link>
                            </li>
                            <li>
                                <Link to={"/game/rain"} className="fc__white"> 글자 비 </Link>
                            </li>
                        </ul>
                    )}
                </div>
            </header>
        </div>
    )
}

export default Header