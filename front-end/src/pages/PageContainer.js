import Navbar from "../components/Navbar";
import { useEffect, useState } from "react"
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import CalendarPage from "./CalendarPage";
import SchedulePage from "./SchedulePage";
import RegisterPage from "./RegisterPage";

function PageContainer() {
    const [userId, setUserId] = useState()
    const [userData, setUserData] = useState()
    const [userSchedule, setUserSchedule] = useState()
    const [currentPage, setCurrentPage] = useState("login")
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

    const handlePageSwitch = (page) => setCurrentPage(page)

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
            {userData == null && currentPage == "login" ? <LoginPage handleUserData={handleUserData} handlePageSwitch={handlePageSwitch}/> : null}
            {userData == null && currentPage == "register" ? <RegisterPage handleUserData={handleUserData} handleUserRegister={handleUserData} handlePageSwitch={handlePageSwitch}/> : null}
            {currentPage == "home" ? <HomePage loggedInUser={userData} schedule={userSchedule}/> : null}
            {currentPage == "calendar" ? <CalendarPage loggedInUser={userData} schedule={userSchedule}/> : null}
            {currentPage == "schedule" ? <SchedulePage loggedInUser={userData} schedule={userSchedule} updateSchedule={handleScheduleUpdate} deleteSchedule={deleteSchedule}/> : null}
        </div>
    )
}

export default PageContainer