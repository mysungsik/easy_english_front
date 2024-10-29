import PaginatedItems from "../../util/paginatedItems";

import style from "./repeat-note-main.module.css"

const RepeatNoteMain = ({user, type, repeatNote, loading, deleteWordToRepeatNote}) => {
    return (
        <div className={`${style['repeat-note-main-section']}`}>
            <PaginatedItems itemsPerPage={7} 
                            type={type} 
                            items={repeatNote}
                            user={user}
                            deleteWordToRepeatNote = {deleteWordToRepeatNote}
                            />
        </div>
    )
}

export default RepeatNoteMain;