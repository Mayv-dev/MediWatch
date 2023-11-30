import Navbar from "../components/Navbar";
import { useEffect, useState } from "react"
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import CalendarPage from "./CalendarPage";
import SchedulePage from "./SchedulePage";

function PageContainer() {
    const [userId, setUserId] = useState()
    const [userData, setUserData] = useState()
    const [userSchedule, setUserSchedule] = useState()
    const [currentPage, setCurrentPage] = useState()
    const [LDMode, setLDMode] = useState("bg-gradient-to-t from-commonBG-900 to-[#552244]")
    let [navColour, setNavColour] = useState("bg-[#502246]")
    let [navTextColour, setNavTextColour] = useState("text-white")

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

    const handleLDSwitch = (e) => {
        setLDMode(LDMode == "bg-gradient-to-t from-commonBG-900 to-[#552244]" ? "bg-gradient-to-t from-commonBG-900 to-[#77cff2]" : "bg-gradient-to-t from-commonBG-900 to-[#552244]")
        setNavColour(navColour == "bg-[#502246]" ? "bg-[#6fbee3]" : "bg-[#502246]")
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
            {userData == null ? <LoginPage handleUserData={handleUserData}/> : null}
            {currentPage == "home" && currentPage != "calendar" && currentPage != "schedule" ? <HomePage loggedInUser={userData} schedule={userSchedule}/> : null}
            {currentPage == "calendar" && currentPage != "home" && currentPage != "schedule" ? <CalendarPage loggedInUser={userData} schedule={userSchedule}/> : null}
            {currentPage == "schedule" && currentPage != "home" && currentPage != "calendar" ? <SchedulePage loggedInUser={userData} schedule={userSchedule} updateSchedule={handleScheduleUpdate} deleteSchedule={deleteSchedule}/> : null}
        </div>
    )
}

export default PageContainer