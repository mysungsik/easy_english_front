import DashboardCards from "../../components/dashboard/dashboard-cards"
import DashboardScore from "../../components/dashboard/dashboard-score"
import DashboardMainSlider from "../../components/dashboard/dashboard-slider"

const Dashboard = () => {
    return (
        <div className="dashboard-page">
            <DashboardMainSlider/>
            <DashboardScore/>
            <DashboardCards/>
        </div>
    )
}
export default Dashboard
