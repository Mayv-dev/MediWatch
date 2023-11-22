import ScheduleList from "../components/ScheduleList"
import ScheduleMenu from "../components/ScheduleMenu"
function SchedulePage(props) {
        return (
            <>
            <div class="flex items-center text-center bg-commonBG-100 h-screen w-screen">
                <ScheduleList schedule={props.loggedInUser.schedule}/>
                <ScheduleMenu meds={props.loggedInUser.medications} userID={props.loggedInUser.id}/>
            </div>
            </>
        )
}

export default SchedulePage