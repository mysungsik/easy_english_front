import style from "./daily-column-right-sidebar.module.css"

const DailyColumnRightSidebar = ({columnInfos, setColumn, getColumnByDate, handleTitleBackground}) =>{

    return(
        <section className={`${style['column-right-side-section']}`}>
            {columnInfos.length > 0 && 
                columnInfos.map((item, index) => (
                    <div className={`${style['select-column-div']} ${handleTitleBackground(item['topic'])} btn-small pointer`} key={index}>
                        <p className={`${style['column-date']}`} >{item['date']}</p>
                        <p className={`${style['column-topic']}`} >{item['topic']}</p>
                    </div>
                ))
            }
        </section>
    )
}

export default DailyColumnRightSidebar