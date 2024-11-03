import CommonLeftSidebar from "../../components/common/sidebar/common-left-sidebar";
import GameRainMain from "../../components/game/game-rain-main";
import style from "./page-games.module.css"

const PageWordRain = ({user}) => {
    const sideDesc= [
        "세상이 오염되고있어요",
        "최대한 오랫동안 비를 막아주세요!"
    ]

    return (
        <div className={`${style['raingame-page']}`}>
        <CommonLeftSidebar user={user}
            title={"RAIN 게임"}
            desc={sideDesc}/>
         <GameRainMain/>
        </div>
    );
};

export default PageWordRain;
