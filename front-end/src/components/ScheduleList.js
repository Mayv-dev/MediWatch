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
        <div className="flex flex-col w-1/2 h-3/4">
        <h2 className="border-t-2 border-l-2 border-r-2 rounded-tl-md w-3/4 mx-auto rounded-tr-md border-gray-300 bg-gray-200">Schedule</h2>
            <div className="border-2 p-1 h-full border-gray-300 rounded-br rounded-bl w-3/4 m-auto bg-white overflow-y-scroll ">
                <ul className="h-full">
                    {list.map(listItem => <li className="border-2 m-1 bg-gray-100">{listItem}</li>)}
                </ul>
            </div>
        </div>
        </>
    )
}

export default ScheduleList