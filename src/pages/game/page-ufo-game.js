import CommonLeftSidebar from "../../components/common/sidebar/common-left-sidebar";
import GameUFOMain from "../../components/game/game-ufo-main";
import style from "./page-games.module.css"

const PageUFOGame = ({user}) => {
    return (
        <div className={`${style['ufogame-page']}`}>
            <CommonLeftSidebar user={user}
                title={"UFO 게임"}/>
            <GameUFOMain/>
        </div>
    );
};

export default PageUFOGame;
