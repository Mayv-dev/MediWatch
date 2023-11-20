import MedicationBox from "../components/MedicationBox"

function HomePage(props) {
        return (
            <>
            <div className="w-screen bg-commonBG-100 h-screen flex flex-col align-center justify-center items-center">
                <MedicationBox userInfo={props.loggedInUser} />
            </ div>
            </>
        )
}

export default HomePage