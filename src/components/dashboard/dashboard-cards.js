import style from "./dashboard-cards.module.css"
import CommonCard from "../common/card/common-card"

const DashboardCards = () =>{

    const selection = [
        {category : '학습하기', title : '오늘의 학습', path : '/learn/today'},
        {category : '학습하기', title : '복습하기', path : '/learn/remind'},
        {category : '학습하기', title : '단어장', path : '/learn/voca'},
        {category : '게임하기', title : '행맨게임', path : '/game/hangman'}
    ]

    return (
        <div className={`${style['dashboard-cards']} base__dorange`}>
            <div className={`${style['dashboard-cards-info']}`}>
                <p className={`fs-14 mb-4`}> Easy English </p>
                <p className={`fs-20`}> 매일매일 재미있게, <span className={`fs-24__b`}>  가볍고 튼튼하게! </span></p>
            </div>
            <div className={`${style['dashboard-cards-main']}`}>
                {selection.map((item)=>(
                    <CommonCard category={item.category} title={item.title} path={item.path} key={item.title}/>
                ))}

            </div>

        </div>
    )
}

export default DashboardCards