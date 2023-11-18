function BoxCompartment(props) {
    let selected = props.colour ?  "compartmentDivSelected" : "compartmentDiv"
    let times = []
    props.schedule.map(scheduledDose => scheduledDose.compartment == props.compartmentInfo.id ? times.push(scheduledDose.datetime) : null)
    return (
        <div className={selected + " bg-white h-20 w-20"} onClick={() => props.selected(props.compartmentInfo.id)}>
        </div>
    )
}

export default BoxCompartment