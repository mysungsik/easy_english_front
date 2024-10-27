import style from "./learn-today-right-sidebar.module.css"

const LearnTodayRightSidebar = ({stateSideBar}) =>{

    console.log(stateSideBar['hintState']['hintLevel'])
    return (
        <section className={`${style['common-side-section']} bg__blue`}>
                {stateSideBar['repeatNoteState']['saved'] ? 
                    <button onClick={stateSideBar['repeatNoteState']['deleteWordToRepeatNote']}> 단어장 빼기</button>
                    :
                    <button onClick={stateSideBar['repeatNoteState']['saveWordToRepeatNote']}> 단어장 넣기</button>
                }
                <button> 예문신고 </button>

                <div className={`d-flex ${style['word-hint-div']}`}>
                {stateSideBar['hintState']['hintLevel'] == 0 && <button onClick={stateSideBar['hintState']['handleHintCnt']}>힌트</button>}
                {stateSideBar['hintState']['hintLevel'] == 1 && <button onClick={stateSideBar['hintState']['handleHintCnt']}>정답보기</button>}
                {stateSideBar['hintState']['hintLevel'] == 2 && <button onClick={stateSideBar['hintState']['handleHintCnt']}>다시풀어보기</button>}
                <button onClick={stateSideBar['utilState']['speechHint']}> 음성힌트 </button>
            </div>
        </section>        
    )

}

export default LearnTodayRightSidebar;
