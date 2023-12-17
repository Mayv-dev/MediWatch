function BoxCompartment(props) {
    let selected = Math.abs(Date.parse(props.item.datetime)-Date.now()) < 1800000 ? "compartmentDiv bg-green-500" : props.colour ?  "compartmentDivSelected" : "compartmentDiv"
    return (
        <div className={selected + " bg-white h-20 w-20"} onClick={() => props.onSelection(props.identifier)}>
            
    {Math.abs(Date.parse(props.item.datetime)-Date.now()) < 3600000 ? 
        Math.abs(Date.parse(props.item.datetime)-Date.now()) < 1800000 ? <p>Due Now</p> : <p>Due Soon</p>
        :null}
        </div>
    )
}

export default BoxCompartment