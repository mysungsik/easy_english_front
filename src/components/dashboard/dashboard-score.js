import style from "./dashboard-score.module.css"

const DashboardScore = () =>{
    return (
        <div className={`${style['dashboard-score']}`}>
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
                    <tr>
                        <td>
                            명식
                        </td>
                        <td>
                            2024-04-12
                        </td>
                        <td>
                            132
                        </td>
                    </tr>
                    <tr>
                        <td>
                            지현
                        </td>
                        <td>
                            2024-04-15
                        </td>
                        <td>
                            132
                        </td>
                    </tr>
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
                    <tr>
                        <td>
                            명식
                        </td>
                        <td>
                            2024-04-12
                        </td>
                        <td>
                            132
                        </td>
                    </tr>
                    <tr>
                        <td>
                            지현
                        </td>
                        <td>
                            2024-04-15
                        </td>
                        <td>
                            132
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default DashboardScore