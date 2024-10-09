import { useEffect, useState } from "react"
import style from "./dashboard-score.module.css"

const DashboardScore = () =>{

    const [hangmanScore, setHangmanScore] = useState([]);
    const [studyScore, setStudyScore] = useState([]);

    useEffect(()=>{
        setHangmanScore([
            {nickname : 'user1', date : '2024-09-09', score : 129},
            {nickname : 'user2', date : '2024-09-09', score : 129},
            {nickname : 'user3', date : '2024-09-09', score : 129},
            {nickname : 'user4', date : '2024-09-09', score : 129},
            {nickname : 'user5', date : '2024-09-09', score : 129}
        ])

        setStudyScore([
            {nickname : 'user1', date : '2024-09-09', score : 521},
            {nickname : 'user2', date : '2024-09-09', score : 520},
            {nickname : 'user3', date : '2024-09-09', score : 129},
            {nickname : 'user4', date : '2024-09-09', score : 129},
            {nickname : 'user5', date : '2024-09-09', score : 129}
        ])
    },[])

    return (
        <div className={`${style['dashboard-score']}`}>
            <div className={`${style['ranking-div']}`}>
                <p className={`fs-14 mb-4`}> Easy Ranking </p>
                <p className={`fs-24__b`}> 최고 점수에 도전하세요! </p>
            </div>
            <div className={`${style['scoreboard-div']}`}>
                <div>
                    <div>
                        행맨 최고점수 TOP 5
                    </div>
                    <table>
                        <thead className={`base__blue`}>
                            <td  className={`fc__white`}>
                                닉네임
                            </td>
                            <td  className={`fc__white`}>
                                날짜
                            </td>
                            <td  className={`fc__white`}>
                                점수
                            </td>
                        </thead>
                        {hangmanScore.map((item)=>(
                            <tr>
                                <td>
                                    {item.nickname}
                                </td>
                                <td>
                                    {item.date}
                                </td>
                                <td>
                                    {item.score}
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
                <div>
                    <div>
                        30일 연속 최고 스터디맨 TOP 5
                    </div>
                    <table>
                        <thead className={`base__blue`}>
                            <td  className={`fc__white`}>
                                닉네임
                            </td>
                            <td  className={`fc__white`}>
                                날짜
                            </td>
                            <td  className={`fc__white`}>
                                새로배운 단어
                            </td>
                        </thead>
                        {studyScore.map((item)=>(
                            <tr>
                                <td>
                                    {item.nickname}
                                </td>
                                <td>
                                    {item.date}
                                </td>
                                <td>
                                    {item.score}
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>

            </div>
        </div>
    )
}

export default DashboardScore