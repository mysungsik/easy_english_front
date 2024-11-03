import style from "./daily-column-right-sidebar.module.css"

const DailyColumnRightSidebar = ({columnInfos, setColumn, getColumnByDate, handleTitleBackground}) =>{

    return(
        <section className={`${style['column-right-side-section']}`}>
            {columnInfos.length > 0 && 
                columnInfos.map((item, index) => (
                    <div className={`${style['select-column-div']} ${handleTitleBackground(item['columnTopic'])} btn-small pointer`} 
                        onClick={()=>getColumnByDate(item['columnDate'])}
                        key={index}
                    >
                        <p className={`${style['column-date']}`} >{item['columnDate']}</p>
                        <p className={`${style['column-topic']}`} >{item['columnTopic']}</p>
                    </div>
                ))
            }
        </section>
    )
}

export default DailyColumnRightSidebar