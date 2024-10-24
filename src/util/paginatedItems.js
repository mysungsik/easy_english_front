import { useState } from "react";
import ReactPaginate from 'react-paginate';
import RepeatNoteItem from "../components/repeat/repeat-note-item";
import "./paginatedItems.css"

const PaginatedItems = ({ itemsPerPage, type , items}) => {
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
        {type === "repeat-note" ? <RepeatNoteItem currentItems={currentItems} /> : "" }
        <ReactPaginate
            className="pagination-main"
            breakLabel="..."
            nextLabel="next >"
            nextClassName="pagination-next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            pageClassName="pagination-count"
            previousLabel="< previous"
            previousClassName="pagination-previous"
            renderOnZeroPageCount={null}
        />
      </>
    );
}

export default PaginatedItems