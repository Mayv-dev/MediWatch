import ScheduleList from "../components/ScheduleList"
function SchedulePage(props) {
        return (
            <>
            <div>
                <ScheduleList schedule={props.loggedInUser.schedule}/>
            </div>
            </>
        )
}

export default SchedulePage