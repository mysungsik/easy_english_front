import { Link } from "react-router-dom"
import style from "./footer.module.css"

const Footer = () => {
    return (
        <footer className={`${style['footer']} base__lgray`}>
            <div className={`${style['footer-bot']} d-flex`}>
                <div className={`${style['footer-bot-nav']} d-flex`}>
                    <ul className={`d-flex`}>
                        <li> 로그아웃 <span> &#183;</span> </li>
                        <li><Link to="#"> 오늘의 학습 </Link> </li><span> &#183;</span>
                        <li><Link to="#"> 복습 </Link> </li><span> &#183;</span>
                        <li><Link to="#"> 게임하기 </Link></li>
                    </ul>
                </div>
                <p className={`${style['footer-bot-warn']}`}> 저작권은 나에게! 이를 무단 이용하는 경우 저작권법 등에 따라 법적 책임을 질 수 있습니다.
                </p>
            </div>
        </footer>
    )
}

export default Footer