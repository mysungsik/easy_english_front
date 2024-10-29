import { useState } from "react";
import ReactPaginate from 'react-paginate';
import RepeatNoteItem from "../components/repeat/repeat-note-item";
import "./paginatedItems.css"

const PaginatedItems = ({ itemsPerPage, type , items, user , deleteWordToRepeatNote}) => {
    const [itemOffset, setItemOffset] = useState(0);
  
    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);
  
    const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    //   console.log( `User requested page number ${event.selected}, which is offset ${newOffset}`);
      setItemOffset(newOffset);
    };

    // 데이터가 없을 경우
    if(items.length < 1){
      return (
        <div>
          데이터가 없습니다
        </div>
      )
    }
  
    return (
      <>
        {/* 페이지네이션 사용할 타입에 따라 다른 컴포넌트 생성 */}
        {type === "repeat-note" ? <RepeatNoteItem 
                                        currentItems={currentItems} 
                                        user={user}
                                        deleteWordToRepeatNote={deleteWordToRepeatNote} /> : "" } 
        <ReactPaginate
            className="pagination-main"
            breakLabel="..."
            nextLabel=" >"
            nextClassName="pagination-next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            pageClassName="pagination-count"
            previousLabel="< "
            previousClassName="pagination-previous"
            renderOnZeroPageCount={null}
        />
      </>
    );
}

export default PaginatedItems