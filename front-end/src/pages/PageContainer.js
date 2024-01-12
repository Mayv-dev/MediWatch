import Navbar from "../components/Navbar";
import { useEffect, useState } from "react"
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import CalendarPage from "./CalendarPage";
import SchedulePage from "./SchedulePage";
import RegisterPage from "./RegisterPage";
import { DARK_BG, DARK_NAV, LIGHT_BG, LIGHT_NAV } from "../config/public_global_constants";

function PageContainer() {
    const [userId, setUserId] = useState()
    const [userData, setUserData] = useState()
    const [userSchedule, setUserSchedule] = useState()
    const [currentPage, setCurrentPage] = useState("login")
    const [LDMode, setLDMode] = useState(DARK_BG)
    let [navColour, setNavColour] = useState(DARK_NAV)
    let [navTextColour, setNavTextColour] = useState("text-white")

    const handleUserData = (data) => {
        setUserId(data.id)
        setUserData(data)
        setUserSchedule(data.schedule)
        setCurrentPage("home")
    }

    const handleScheduleUpdate = (data) => setUserSchedule(data)

    const handlePageSwitch = (page) => setCurrentPage(page)

    const handleLDSwitch = (e) => {
        setLDMode(LDMode == DARK_BG ? LIGHT_BG : DARK_BG)
        setNavColour(navColour == DARK_NAV ? LIGHT_NAV : DARK_NAV)
        setNavTextColour(navTextColour == "text-white" ? "text-black" : "text-white")
    }


    const deleteSchedule = (sID) => {
        //const scheduleIndex = userSchedule.findIndex((schedule => schedule.id === sID))
        
        setUserSchedule(prev => {
            return prev.filter(schedule => schedule.id !== sID)
        })
   
    }
    
    return (
        <div className={LDMode}>
            <Navbar LDModeSwitch={handleLDSwitch} pageChange={handlePageSwitch} navColour={navColour} textColour={navTextColour} page={currentPage}/>
            {userData == null && currentPage == "login" ? <LoginPage handleUserData={handleUserData}/> : null}
            {userData == null && currentPage == "register" ? <RegisterPage handleUserData={handleUserData} handleUserRegister={handleUserData}/> : null}
            {currentPage == "home" ? <HomePage loggedInUser={userData} schedule={userSchedule}/> : null}
            {currentPage == "calendar" ? <CalendarPage loggedInUser={userData} schedule={userSchedule}/> : null}
            {currentPage == "schedule" ? <SchedulePage loggedInUser={userData} schedule={userSchedule} updateSchedule={handleScheduleUpdate} deleteSchedule={deleteSchedule}/> : null}
        </div>
    )
}

export default PageContainer