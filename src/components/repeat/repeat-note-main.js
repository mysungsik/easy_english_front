import PaginatedItems from "../../util/paginatedItems";

import style from "./repeat-note-main.module.css"

const RepeatNoteMain = ({user, type, repeatNote, loading}) => {
    return (
        <div className={`${style['repeat-note-main-section']}`}>
            <PaginatedItems itemsPerPage={4} type={type} items={repeatNote}/>
        </div>
    )
}

export default RepeatNoteMain;