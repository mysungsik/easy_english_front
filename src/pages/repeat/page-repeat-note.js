import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import RepeatNoteMain from "../../components/repeat/repeat-note-main";
import axiosInstance from "../../config/axiosConfig";
import CommonLeftSidebar from "../../components/common/sidebar/common-left-sidebar";
import style from "./page-repeat-note.module.css"

const PageRepeatNote = ({user}) =>{
    const [repeatNote, setRepeatNote] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();


    // useLayoutEffect 를 통해 화면 깜빡임 제거
    useLayoutEffect(()=>{
        if(!Object.keys(user).length > 0){
            alert("로그인 후 이용해주세요")
            navigate("/login", {replace:true})
        }else{
            getRepeatNote()
        }
    },[user])

    // 데이터 가져오기
    const getRepeatNote = async () =>{
        setLoading(true)
        // 데이터 가져오기
        const response = await axiosInstance.get(`/learn/getAllWordsFromRepeatNote?memberNo=${user.memberNo}`);

        setRepeatNote([...response.data])
        setLoading(false)
    }

    // 단어장 삭제
    const deleteWordToRepeatNote = async (memberNo, wordId) =>{
        const response = await axiosInstance.delete(`/learn/deleteWordFromRepatNote?memberNo=${memberNo}&wordId=${wordId}`)

        if (response.data >= 1){
            setRepeatNote((prev) => prev.filter((item)=> item.wordId != wordId))
        }
        alert(response.message)
    }

    return (
        <div className={`${style['repeat-note-page']}`}>
            <CommonLeftSidebar user={user}
                                title={"단어장 확인"} />
            <RepeatNoteMain
                user={user}
                type={"repeat-note"}
                repeatNote={repeatNote} 
                loading={loading}
                deleteWordToRepeatNote={deleteWordToRepeatNote}
            />
        </div>
    )
}

export default PageRepeatNote;