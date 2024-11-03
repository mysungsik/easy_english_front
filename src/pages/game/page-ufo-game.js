import CommonLeftSidebar from "../../components/common/sidebar/common-left-sidebar";
import GameUFOMain from "../../components/game/game-ufo-main";
import style from "./page-games.module.css"

const PageUFOGame = ({user}) => {
    const sideDesc= [
        "기회는 단 7번!",
        "UFO 가 잡아가는 사람을 구출하세요!",
        "힌트를 생성하거나 단어를 추측하여",
        "제한횟수 안에 맞춰보세요!",
    ]

    return (
        <div className={`${style['ufogame-page']}`}>
            <CommonLeftSidebar user={user}
                title={"UFO 게임"}
                desc={sideDesc}/>
            <GameUFOMain/>
        </div>
    );
};

export default PageUFOGame;
