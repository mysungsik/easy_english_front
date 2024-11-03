import { useLayoutEffect, useState, useEffect } from "react";
import CommonLeftSidebar from "../../components/common/sidebar/common-left-sidebar";
import axiosInstance from "../../config/axiosConfig";
import style from "./page-daily-column.module.css"
import DailyColumnMain from "../../components/dailycolumn/daily-column-main";
import DailyColumnRightSidebar from "../../components/dailycolumn/daily-column-right-sidebar";

const PageDailyColumn = ({user}) => {
    const [columnDate, setColumnDate] = useState();
    const [columnInfos, setColumnInfos] = useState([])
    const [loading, setLoading] = useState(false)
    const [column, setColumn] = useState({})

    useLayoutEffect(()=>{
        getColumnByDate("") // 금일 날짜의 칼럼 가져오기
        getColumnInfosBefore7days()
    },[])

    // 칼럼 상세정보 가져오기
    const getColumnByDate = async (date) =>{
        let dateData = date;
        if (dateData == ""){
            const today = new Date();
            const day = String(today.getDate()); 
            const month = String(today.getMonth() + 1);
            const year = String(today.getFullYear()).slice(-2);
            dateData = `${year}/${month}/${day}`

            setColumnDate(dateData)
        }

        const response = await axiosInstance.get(`/dailyColumn/getColumnByDate?date=${dateData}`);
        if (response.data === "" || response.data === null){
            alert("해당 날짜의 칼럼이 없습니다.");
        }else{
            setColumn(response.data)
            setLoading(false)
        }
    }

    // 최근 7일의 칼럼 정보 가져오기
    const getColumnInfosBefore7days = async () =>{
        const response = await axiosInstance.get(`/dailyColumn/getRecentColumnsInfo`);
        if (response.data === "" || response.data === null){
            alert("해당 날짜의 칼럼정보가 없습니다.");
        }else{
            setColumnInfos(response.data)
        }
    }

    // 컬럼마다 다른 백그라운드 색
    const handleTitleBackground = (topic) =>{
        switch(topic){
            case "Food" : return 'bg__llblue';
            case "Music" : return 'bg__navy';
            case "Society" : return 'bg__purple';
            case "Technology" : return 'bg__red';
            case "Relationships" : return 'bg__orange';
            case "Animal" : return 'bg__yellow';
            case "Game" : return 'bg__green';
        }
    }

    const sideDesc= [
        "하루에 하나의 칼럼을 읽어봐요",
        "7가지의 칼럼주제를 이용하여",
        "일주일간 하나씩 읽을 수 있어요",
        "여러분들들의 영어실력을 키우세요!",
    ]

    return (
        <div className={`${style['dailycolumn-page']}`}>
            <CommonLeftSidebar user={user}
                                title={"하루칼럼"}
                                desc={sideDesc}/>
            <DailyColumnMain column={column}
                                handleTitleBackground = {handleTitleBackground}/>
            <DailyColumnRightSidebar columnInfos = {columnInfos} 
                                    setColumn ={setColumn} 
                                    getColumnByDate={getColumnByDate}
                                    handleTitleBackground={handleTitleBackground}/>
        </div>
    )
}
export default PageDailyColumn
