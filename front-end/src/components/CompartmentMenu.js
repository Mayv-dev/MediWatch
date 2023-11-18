function CompartmentMenu(props) {
    let times = []
    
    props.schedule.map(scheduledDose => scheduledDose.compartment == props.selectedCompartment ? times.push(scheduledDose.datetime) : null)
    return (
        <div id="compartment-menu" className="bg-white h-40 w-10/12">
            <div id="time-column" class="bg-gray-200 w-60 mx-auto">
                <h2>Doses</h2>
                <ul>{times.length === 0 ? <li>No medication to be taken</li> : times.map(time => <li>{time}</li>)}</ul>
            </div>
        </div>
    )
}

export default CompartmentMenu;