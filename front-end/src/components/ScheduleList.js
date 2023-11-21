import { useEffect, useState } from "react"

function ScheduleList(props) {
    let [list,setList] = useState(props.schedule)
    useEffect(() => {setList(props.schedule)},[props.schedule])
    return (
        <>
        <div className="w-screen bg-commonBG-100 h-screen flex flex-col align-center justify-center items-center">
            <h2>Schedule</h2>
            <ul>
                {list.map(listItem => <li>{listItem}</li>)}
            </ul>
        </div>
        </>
    )
}

export default ScheduleList