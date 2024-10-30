import CommonLeftSidebar from "../../components/common/sidebar/common-left-sidebar";
import GameRainMain from "../../components/game/game-rain-main";
import style from "./page-games.module.css"

const PageWordRain = ({user}) => {
    return (
        <div className={`${style['raingame-page']}`}>
        <CommonLeftSidebar user={user}
            title={"RAIN 게임"}/>
         <GameRainMain/>
        </div>
    );
};

export default PageWordRain;
