import { useEffect, useState } from "react"

function ScheduleList(props) { 
    const monthStrings = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    let minutes, hours, day, month;
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
        date.getMinutes() / 10 < 1 ? minutes = "0" + date.getMinutes() : minutes = date.getMinutes()
        month = monthStrings[date.getMonth()]

        return day + " " + month + " " + date.getFullYear() + " - " + hours + ":" + minutes
    })

    let [list,setList] = useState(dateConversion)
    return (
        <>
        <div className="w-1/2">
            <div className="border-2 border-black rounded-md w-1/2 m-auto bg-white">
                <h2 className="border-b-2 rounded-tl-md rounded-tr-md border-black bg-gray-200">Schedule</h2>
                <ul>
                    
                    {list.map(listItem => <li>{listItem}</li>)}
                </ul>
            </div>
        </div>
        </>
    )
}

export default ScheduleList