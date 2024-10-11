import LearnTodayMain from "../../components/learn/learn-today-main"
import LearnTodaySide from "../../components/learn/learn-today-side"

const LearnToday = () => {
    return (
        <div className="learntoday-page d-flex">
            <LearnTodaySide/>
            <LearnTodayMain/>
        </div>

    )
}
export default LearnToday
