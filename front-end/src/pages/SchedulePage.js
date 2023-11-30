import ScheduleList from "../components/ScheduleList"
import ScheduleMenu from "../components/ScheduleMenu"
function SchedulePage(props) {
        return (
            <>
            <div class="flex items-center text-center h-screen w-screen">
                <ScheduleList userID={props.loggedInUser.id} schedule={props.schedule} deleteSchedule={props.deleteSchedule}/>
                <ScheduleMenu meds={props.loggedInUser.medications} userID={props.loggedInUser.id} updateSchedule={props.updateSchedule} />
            </div>
            </>
        )
}

export default SchedulePage