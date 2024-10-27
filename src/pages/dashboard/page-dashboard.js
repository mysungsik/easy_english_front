import DashboardCards from "../../components/dashboard/dashboard-cards"
import DashboardMain from "../../components/dashboard/dashboard-main"
import DashboardScore from "../../components/dashboard/dashboard-score"
import DashboardMainSlider from "../../components/dashboard/dashboard-slider"

const PageDashboard = () => {
    return (
        <div className="dashboard-page">
            {/* <DashboardMainSlider/> */}
            <DashboardMain/>
            {/* <DashboardScore/>
            <DashboardCards/> */}
        </div>
    )
}
export default PageDashboard
