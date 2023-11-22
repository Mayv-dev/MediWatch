import Navbar from "../components/Navbar";
import { useState } from "react"
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import CalendarPage from "./CalendarPage";
import SchedulePage from "./SchedulePage";

function PageContainer() {
    const [userId, setUserId] = useState()
    const [userData, setUserData] = useState()
    const [userSchedule, setUserSchedule] = useState()
    const [currentPage, setCurrentPage] = useState()
    const [LDMode, setLDMode] = useState("bg-commonBG-900")

    const handleUserData = (data) => {
        setUserId(data.id)
        setUserData(data)
        setUserSchedule(data.schedule)
        setCurrentPage("home")
    }

    const handleScheduleUpdate = (data) => {
        console.log(data)
        setUserSchedule(data)
    }

    const handlePageSwitch = (page) => userData != null ? setCurrentPage(page) : null

    const handleLDSwitch = (e) => setLDMode(LDMode == "bg-commonBG-900" ? "bg-commonBG-100" : "bg-commonBG-900")

    return (
        <div className={LDMode}>
            <Navbar LDModeSwitch={handleLDSwitch} pageChange={handlePageSwitch}/>
            {userData == null ? <LoginPage handleUserData={handleUserData}/> : null}
            {currentPage == "home" && currentPage != "calendar" && currentPage != "schedule" ? <HomePage loggedInUser={userData} schedule={userSchedule}/> : null}
            {currentPage == "calendar" && currentPage != "home" && currentPage != "schedule" ? <CalendarPage loggedInUser={userData} schedule={userSchedule}/> : null}
            {currentPage == "schedule" && currentPage != "home" && currentPage != "calendar" ? <SchedulePage loggedInUser={userData} schedule={userSchedule} updateSchedule={handleScheduleUpdate}/> : null}
        </div>
    )
}

export default PageContainer