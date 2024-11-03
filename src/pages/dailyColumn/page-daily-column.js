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

    // 이전 7일의 데이터 정보만 가져오기
    const getColumnInfosBefore7days = async () =>{
        setColumnInfos([
            {topic : "Food", date : "24/10/25"},
            {topic : "Music", date : "24/10/26"},
            {topic : "Society", date : "24/10/27"},
            {topic : "Technology", date : "24/10/28"},
            {topic : "Relationships", date : "24/10/29"},
            {topic : "Animal", date : "24/10/30"},
            {topic : "Game", date : "24/11/1"}
        ])
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

    return (
        <div className={`${style['dailycolumn-page']}`}>
            <CommonLeftSidebar user={user}
                                title={"하루칼럼"} />
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
