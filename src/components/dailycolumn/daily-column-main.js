import React, { useState } from "react";
import style from "./daily-column-main.module.css"
import axiosInstance from "../../config/axiosConfig";

const DailyColumnMain = ({column, handleTitleBackground}) =>{
    const [selectedText, setSelectedText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    // 마우스 드래그시 화면에 표시되는 텍스트
    const handleMouseUp = (e) => {
        const selected = window.getSelection().toString(); // 브라우저 기본객체인 드래그 값 확인
        if (selected) {
            setSelectedText(selected);
            
            const { clientX, clientY } = e; // 마우스포지션을 e.clientX, e.clientY 로 확인
            setTooltipPosition({ // 툴팁 포지션 확인
                x: clientX,
                y: clientY - 30 // 30px 만 위로
            });
        } else {
            setSelectedText(''); // 드래그한 값이 없을경우 초기화
            setTranslatedText('')
        }
    };

    // Text 로 온 값 화면에 단락 나누어 포맷팅
    const formatTextToHTML = (text) => {

        // text 를 React 형식으로 단락 및 줄바꿈
        // React.Fragment : 감싸는 노드 없이 자식 노드를 사용하기 위함. <></> 와 동일
        //                  단, <></> 에는 key 를 넣을 수 없어 React.Fragment 사용 
        return text
            .split("\n\n") // 단락을 기준으로 나누기
            .map((paragraph, index) => (
                <p className={`${style['column-text']}`} key={index}>
                    {paragraph.split("\n").map((line, lineIndex) => (
                        <React.Fragment  key={lineIndex}>
                        {line}
                        <br/>
                        </React.Fragment>
                    ))}
                </p>
        ));
    };

    // 번역 요청
    const translateWithTranslationAI = async () => {
        const searchValue = selectedText

        const response = await axiosInstance.get(`/dailyColumn/getTranslation?text=${searchValue}`);
        if (response.data === "" || response.data === null){
            alert(response.message);
        }else{
            setTranslatedText(response.data)
        }
    }

    return(
        <section className={`${style['column-main-section']}`}>
            <p className={`${style['column-info']} fs__l fw__b ${handleTitleBackground(column['columnTopic'])}`}>
                {column['columnTopic']} / {column['columnTitle']}  
            </p>
            <div className={`${style['column-text-div']}`} onMouseUp={handleMouseUp}>
                {column.hasOwnProperty("columnTopic") && formatTextToHTML(column['columnContent'])}
            </div>
            {selectedText && (
                <div className={`${style['tooltip']} ${handleTitleBackground(column['columnTopic'])} bs__gray`} 
                     style={{
                        left: tooltipPosition.x,
                        top: tooltipPosition.y,
                    }}
                >
                    <p className={`${style['tooltip-content']}`}>
                        {translatedText != '' ? translatedText : selectedText}
                    </p>
                    <button className={`btn-small btn__white`} onClick={translateWithTranslationAI}> 검색 </button>
                </div>
            )}
        </section>
    )
}

export default DailyColumnMain