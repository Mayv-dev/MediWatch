import Navbar from "../components/Navbar";
import { useState } from "react"
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import CalendarPage from "./CalendarPage";

function PageContainer() {
    const [userData, setUserData] = useState()
    const [currentPage, setCurrentPage] = useState()

    const handleUserData = (data) => {
        setUserData(data)
        setCurrentPage("home")
    }

    const handlePageSwitch = (page) => userData != null ? setCurrentPage(page) : null

    return (
        <>
        <Navbar pageChange={handlePageSwitch}/>
        {userData == null ? <LoginPage handleUserData={handleUserData}/> : null}
        {currentPage == "home" && currentPage != "calendar" ? <HomePage loggedInUser={userData}/> : null}
        {currentPage == "calendar" && currentPage != "home" ? <CalendarPage /> : null}
        </>
    )
}

export default PageContainer