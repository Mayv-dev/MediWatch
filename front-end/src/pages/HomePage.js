import MedicationBox from "../components/MedicationBox"
function HomePage(props) {
        return (
            <div className="w-screen h-screen flex flex-col align-center justify-center items-center">
                <MedicationBox userInfo={props.loggedInUser} schedule={props.schedule}/>
            </div>
        )
}
export default HomePage