import { useEffect, useState } from "react"

function ScheduleList(props) { 
    const monthStrings = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    let seconds, hours, day, month;
    let dateConversion = props.schedule.map(item => new Date(item.datetime))
    dateConversion = dateConversion.map(date => {
        if (date.getDate() % 10 != 1) {
            if (date.getDate() % 10 != 2) {
                if (date.getDate() % 10 == 3) day = date.getDate() + "rd"
                else day = date.getDate() + "th"
            }
            else day = date.getDate() + "nd"
        }
        else day = date.getDate() + "st"
        date.getHours() / 10 < 1 ? hours = "0" + date.getHours() : hours = date.getHours()
        date.getSeconds() / 10 < 1 ? seconds = "0" + date.getSeconds() : seconds = date.getSeconds()
        month = monthStrings[date.getMonth()]

        return day + " " + month + " " + date.getFullYear() + " - " + hours + ":" + seconds
    })

    let [list,setList] = useState(dateConversion)
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