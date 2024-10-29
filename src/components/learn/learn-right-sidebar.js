import style from "./learn-right-sidebar.module.css"

const LearnRightSidebar = ({stateSideBar}) =>{
    
    return (
        <section className={`${style['common-side-section']} bg__blue`}>
                {stateSideBar['repeatNoteState']['saved'] ? 
                    <button className={`btn__white btn-medium ml-8 mt-6 mb-12`}
                        onClick={stateSideBar['repeatNoteState']['deleteWordToRepeatNote']}> 
                        단어장 빼기
                        <img src="/icons/arrow-right__black.png" 
                            style={{width : "25px", height : "25px"}}/>
                    </button>
                    :
                    <button className={`btn__white btn-medium mt-6 ml-8 mb-12`}
                        onClick={stateSideBar['repeatNoteState']['saveWordToRepeatNote']}> 
                        단어장 넣기
                        <img src="/icons/arrow-right__black.png" 
                            className="ml-8" 
                            style={{width : "25px", height : "25px"}}/>
                    </button>
                }
                
                <button className={`btn__white btn-medium ml-8 mb-12`}> 
                    예문신고 
                    <img src="/icons/arrow-right__black.png" 
                        className="ml-8" 
                        style={{width : "25px", height : "25px"}}/>
                </button>

              
                {stateSideBar['hintState']['hintLevel'] == 0 && 
                    <button onClick={stateSideBar['hintState']['handleHintCnt']}
                            className={`btn__white btn-medium ml-8 mb-12`}>
                        힌트
                        <img src="/icons/arrow-right__black.png" 
                        className="ml-8" 
                        style={{width : "25px", height : "25px"}}/>
                    </button>
                }
                {stateSideBar['hintState']['hintLevel'] == 1 && 
                    <button onClick={stateSideBar['hintState']['handleHintCnt']}
                            className={`btn__white btn-medium ml-8 mb-12`}>
                        정답보기
                        <img src="/icons/arrow-right__black.png" 
                        className="ml-8" 
                        style={{width : "25px", height : "25px"}}/>
                    </button>
                }
                {stateSideBar['hintState']['hintLevel'] == 2 && 
                    <button onClick={stateSideBar['hintState']['handleHintCnt']}
                            className={`btn__white btn-medium ml-8 mb-12`}>
                        다시풀어보기
                        <img src="/icons/arrow-right__black.png" 
                        className="ml-8" 
                        style={{width : "25px", height : "25px"}}/>
                    </button>
                }
                
                <button  className={`btn__white btn-medium ml-8 mb-12`}
                    onClick={stateSideBar['utilState']['speechHint']}> 
                    음성힌트 
                    <img src="/icons/arrow-right__black.png" 
                        className="ml-8" 
                        style={{width : "25px", height : "25px"}}/>
                </button>
            
        </section>        
    )

}

export default LearnRightSidebar;
