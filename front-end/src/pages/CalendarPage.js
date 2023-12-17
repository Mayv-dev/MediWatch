import DatesBar from "../components/DatesBar"
function CalendarPage(props) {
    return (
        <div className="w-screen h-screen flex flex-col align-center justify-center items-center">
            <DatesBar schedule={props.schedule}/>
        </div>
    )
}
export default CalendarPage