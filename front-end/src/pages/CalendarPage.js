import DatesBar from "../components/DatesBar"
function CalendarPage(props) {
    return (
        <div className="w-screen bg-commonBG-100 h-screen flex flex-col align-center justify-center items-center">
            <DatesBar userInfo={props.loggedInUser}/>
        </ div>
    )
}

export default CalendarPage