import { useState } from "react";
import style from "./repeat-note-item.module.css"
import axiosInstance from "../../config/axiosConfig"

const RepeatNoteItem = ({ currentItems, user , deleteWordToRepeatNote}) => {
    /* "wordId","wordSpell","wordMean", "exampleSentence", "exampleMean"
    */
   
    return (
        <>
            {currentItems.length > 0 &&
                currentItems.map((item, index) => (
                    <Card item={item} user={user} deleteWordToRepeatNote={deleteWordToRepeatNote} key={index}/>
            ))}
        </>
    );
}

const Card = ({item, user, deleteWordToRepeatNote}) =>{
    const [showSentence, setShowSentence] = useState(false)


    const handleShowSentence = () =>{
        setShowSentence(prev=> !prev)
    }

    return(
    <div className={`${style['repeat-note-item']} `}>
        <div className={`${style['item-top-div']} bg__white  bs__gray ${showSentence ? style['show'] : style['hide']}`}>
            <div className={`${style['mean-info-div']}`}>
                <div>
                    <p>레벨 {item.wordId}</p>
                    <p className="fs__l fw__b">{item.wordSpell}</p>
                </div>
                <div>
                    <p className="fs__l fw__b">{item.wordMean}</p>
                    {showSentence ? 
                    <img
                        src="/icons/arrow-top__black.png" 
                        className="ml-8 pointer" 
                        style={{width : "25px", height : "25px"}}
                        onClick={handleShowSentence}/>
                        :
                    <img
                        src="/icons/arrow-bot__black.png" 
                        className="ml-8 pointer" 
                        style={{width : "25px", height : "25px"}}
                        onClick={handleShowSentence}/> 
                    }
                </div>
            </div>
            <div className={`${style['sentence-info-div']} bg__llblue bs__gray`}>
                <p>
                    {item.exampleMean}
                </p>
                <p className="mt-12" >
                    {item.exampleSentence}
                </p>
            </div>
        </div>
        <button className={`btn-small btn__red`} onClick={()=>{deleteWordToRepeatNote(user.memberNo, item.wordId)}}> 제거 </button>
    </div>
    )
}

export default RepeatNoteItem