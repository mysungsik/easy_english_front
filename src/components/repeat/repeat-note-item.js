import { useState } from "react";
import style from "./repeat-note-item.module.css"

const RepeatNoteItem = ({ currentItems }) => {
    /*
    {
        "wordId": 13,
        "wordLevel": 1,
        "wordSpell": "you",
        "wordMean": "너",
        "exampleSentence": "The truth is that you are the only one who can make you happy.",
        "exampleMean": "사실은 행복하게 할 수 있는 사람은 당신 자신뿐이라는 것"
    }
    */
   
    return (
        <>
            {currentItems.length > 0 &&
                currentItems.map((item, index) => (
                    <Card item={item} key={index}/>
            ))}
        </>
    );
}

const Card = ({item}) =>{
    const [showMean, setShowMean] = useState(false)
    const [showSentence, setShowSentence] = useState(false)

    const handleShowMean = () =>{
        setShowMean(prev=> !prev)
    }

    const handleShowSentence = () =>{
        setShowSentence(prev=> !prev)
    }

    return(
        <div className={`${style['repeat-note-item']}`}>
        <div className={`${style['word-info-div']}`}>
            <p className={`${style['word-spell']}`}>{item.wordSpell}</p>
            <p className={ `${style['word-mean']} 
                            ${showMean ? style['show'] : style['hide']}
                            pointer`}
                            onClick={handleShowMean}> 

                {showMean ? item.wordMean : <span className="fc__white">클릭해서 확인 </span>}
                
            </p>
        </div>
        <div className={`${style['word-example-mean-div']}`}>
            <p className={`${style['word-example-mean-div']}`}>{item.exampleMean}</p>
        </div>
        <div className={`${style['word-example-sentence-div']}`}>
            <p className={` ${style['word-example-sentence']} 
                            ${showSentence ? style['show'] : style['hide']}
                            pointer`}
                            onClick={handleShowSentence}>
                {showSentence ? item.exampleSentence : <span className="fc__white">클릭해서 확인 </span>}
            </p>
        </div>
    </div>
    )
}

export default RepeatNoteItem