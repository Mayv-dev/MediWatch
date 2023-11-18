function BoxCompartment(props) {
    let selected = props.colour ?  "compartmentDivSelected" : "compartmentDiv"
    let times = []
    props.schedule.map(scheduledDose => scheduledDose.compartment == props.compartmentInfo.id ? times.push(scheduledDose.datetime) : null)
    return (
        <div className={selected + " bg-white h-20 w-auto"} onClick={() => props.selected(props.compartmentInfo.compartment)}>
            <ul>{times.length === 0 ? <li>No medication to be taken</li> : times.map(time => <li>{time}</li>)}</ul>
        </div>
    )
}

export default BoxCompartment