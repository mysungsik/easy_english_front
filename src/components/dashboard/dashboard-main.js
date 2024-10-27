import { Link } from "react-router-dom";
import style from "./dashboard-main.module.css"
const DashboardMain = () => {
    return(
        <section className={`${style['dashboard-main-section']}`}>
            {/* 상단 타이틀 */}
            <div className={`${style['dashboard-title-div']} bg-linear__r_blue bs__gray`}>
                <p className={`${style['dashboard-title']} fs-header__l fw__b text-shadow__gray fc__white`}> 세상에서 가장 쉬운 <br/> 영어 공부를 시작할 준비가 되셨나요?</p>
                <p className={`${style['dashboard-subtitle']} fs-header__m fc__white`}>매일 20개의 단어와 예문과 함께 공부를 시작해보세요!</p>
            </div>

            {/* 중단 - 새단어 공부하기 설명 */}
            <div className={`${style['dashboard-content-1']}`}>
                <div className={`${style['content-1-info-div']}`}>
                    <p className={`${style['content-1-title']} fs-header__m fw__b`}> 매일 새로운 20개의 단어와 예문</p>
                    <p className={`${style['content-1-subtitle']} fs__m`}> 
                        영어에서 가장 자주 사용하는 4500개 의 단어와 함께
                        AI 가 생성해주는 예문을 통해 함께 공부해봅시다! <br/><br/>

                        필요하다면 새 문장을 생성하여 다른 일상표현도
                        확인하고 따라해보세요! <br/><br/>

                        힌트를 통해 어렵지 않게 헤쳐나갈수 있을거에요! <br/><br/>
                    </p>
                    <Link className="btn-big btn__blue" to={"/learn/today"}> 
                        <img src="/icons/info-white.png" 
                            className="mr-8" 
                            style={{width : "25px", height : "25px"}}/> 
                        새 단어 공부하러 가기</Link>
                </div>
                <div className={`${style['content-1-img-div']} bs__gray`}>
                    <img src="/dashboard/main1.png"/>
                </div>
            </div>

            {/* 중단 - 게임 컨텐츠 설명 */}
            <div className={`${style['dashboard-content-2']}`}>
               <div className={`${style['content-2-info-div']}`}>
                    <p className={`${style['content-2-title']} fs-header__m fw__b`}> 게임과 함께 즐겨요</p>
                    <p className={`${style['content-2-subtitle']} fs__m`}> 
                        게임과 함께 영어를 공부해여
                        머리를 Refresh!<br/> 영어단어 타자연습이 준비되어있어요 <br/><br/>

                        친구들과 함께 영단어를 유추하면서<br/>
                        UFO로 부터 사람을 구해보새요! <br/><br/>

                        친구들과 함께 내기하며 도전해요! <br/><br/>
                    </p>
                </div>
                <div className={`${style['content-2-games-div']}`}>
                    {/* GAME - 1  */}
                    <div className={`${style['card-section']} bg__white br-15 bs__gray`}>
                        <div className={`${style['card-title-div']} bg__white br-15`}>
                            <p className={`${style['card-title']} fs__l fw__b fc__blue`}> English Rain</p>
                            <p className={`${style['card-subtitle']} fs__l`}> 하늘에서 영어단어가 내려와</p>

                        </div>
                        <p className={`${style['card-description']} fs__m`}>
                            20초마다 더 빠르게 내려오는 단어!<br/>
                            단어를 맞추면 영어 뜻이 나와요!<br/><br/>

                            끝까지 살아남아서<br/>
                            최고기록을 갱신해보세요!<br/><br/>
                        </p>
                        <Link className="btn-big btn__blue" to={"/game/rain"}> 
                            English Rain
                            <img src="/icons/arrow-right__white.png" className="ml-8" style={{width : "25px", height : "25px"}}/> 
                        </Link>
                    </div>
                    {/* GAME - 2  */}
                    <div className={`${style['card-section']} bg__white br-15 bs__gray`}>
                        <div className={`${style['card-title-div']} bg__white br-15`}>
                            <p className={`${style['card-title']} fs__l fw__b fc__blue`}> UFO Guess </p>
                            <p className={`${style['card-subtitle']} fs__l`}> 하늘에서 영어단어가 내려와</p>

                        </div>
                        <p className={`${style['card-description']} fs__m`}>
                            20초마다 더 빠르게 내려오는 단어!<br/>
                            단어를 맞추면 영어 뜻이 나와요!<br/><br/>

                            끝까지 살아남아서<br/>
                            최고기록을 갱신해보세요!<br/><br/>
                        </p>
                        <Link className="btn-big btn__blue"  to={"/game/ufo"}> 
                            UFO Guess
                            <img src="/icons/arrow-right__white.png" className="ml-8" style={{width : "25px", height : "25px"}}/> 
                        </Link>
                    </div>
                </div>

            </div>

            {/* 하단 - 복습 방법 설명 설명 */}
            <div className={`${style['dashboard-content-3']} bg-linear__r_blue bs__gray`}>
                <div className={`${style['content-3-info-div']}`}>
                    <p className={`fs-header__s fc__white text-shadow__gray`}>
                        영어는 복습이 중요해요! <br/>
                        영어 문장 복습과 단어장 기능을 활용해보세요!
                    </p>
                    <p className={`fc__white`}> 
                        복습하기에서는 여러분이 배웠던 범위까지 <br/>
                        무작위로 단어를 제시해줘요!<br/><br/>
                        그래도 계속 생각이 나지 않는다면<br/>
                        단어장 기능을 활용해 저장해보세요!
                    </p>
                </div>
                <div className={`${style['content-3-btns-div']}`}>
                    <Link className={`btn-big btn__white`} to={"/learn/review"}>
                        복습하러가기
                        <img src="/icons/arrow-right__black.png" className="ml-8" style={{width : "25px", height : "25px"}}/> 
                    </Link>
                    <Link className={`btn-big btn__white`} to={"/learn/repeatNote"}>
                        단어장 확인하기
                        <img src="/icons/arrow-right__black.png" className="ml-8" style={{width : "25px", height : "25px"}}/> 
                    </Link>
                </div>
            </div>

        </section>
    )
}

export default DashboardMain;