import { Link } from "react-router-dom";
import style from "./common-card.module.css"
import { useState } from "react";

const CommonCard = ({ category, title, path }) => {

    const [toggle, setToggle] = useState(false)

    const  handleMouseOver = () =>{
        setToggle(true)
    }
    const  handleMouseLeave = () =>{
        setToggle(false)
    }



    return (
        <Link to={path} className={`${style['common-card']}`} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
            <div className={`${style['card-info-div']}`}>
                <p className={`${style['card-category']} fs-14`}> {category}</p>
                <p className={`${style['card-title']} fs-20`}> {title}</p>
            </div>
            <div>
                바로가기
            </div>

            {/* 호버시 보일 화면*/}
            <div className={`${style['card-info-hover']} ${toggle ? style['show'] : style['hide']}`}>
                <p className={`fc__white fs-20__b`}> {title} </p>
            </div>
        </Link>
    )
}

export default CommonCard;