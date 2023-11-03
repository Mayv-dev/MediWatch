import MedicationBox from "../components/MedicationBox"

let data = [
                {"compartment":"1","doseDatetime":"3-11-23 17:00"},
                {"compartment":"2","doseDatetime":"3-11-23 17:00"},
                {"compartment":"3","doseDatetime":"3-11-23 17:00"},
                {"compartment":"4","doseDatetime":"3-11-23 17:00"},
                {"compartment":"5","doseDatetime":"3-11-23 17:00"},
                {"compartment":"6","doseDatetime":"3-11-23 17:00"},
                {"compartment":"7","doseDatetime":"3-11-23 17:00"},
            ]

function HomePage() {
    return (
        <>
            <h1>This is the HomePage</h1>
            <MedicationBox compartments={data}/>
        </>
    )
}

export default HomePage