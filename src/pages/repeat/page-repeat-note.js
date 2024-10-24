import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import RepeatNoteMain from "../../components/repeat/repeat-note-main";
import axiosInstance from "../../config/axiosConfig";
import RepeatNoteSide from "../../components/repeat/repeat-note-side";

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

    return (
        <div className="repeat-note-page d-flex">
            <RepeatNoteSide user={user}/>
            <RepeatNoteMain
                user={user}
                type={"repeat-note"}
                repeatNote={repeatNote} 
                loading={loading}
            />
        </div>
    )
}

export default PageRepeatNote;