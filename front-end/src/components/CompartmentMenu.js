function CompartmentMenu(props) {
    let times = []
    let date, hours, minutes
    props.schedule.map(scheduledDose => scheduledDose.compartment == props.selectedCompartment ? times.push(scheduledDose.datetime) : null)
    times = times.map(time => {
        date = new Date(time)
        hours = date.getHours()
        if (hours < 10) hours = `0${hours}`
        minutes = date.getMinutes()
        if (minutes < 10) minutes = `0${minutes}`
        return hours + ":" + minutes
    })
    console.log(times)
    
    
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