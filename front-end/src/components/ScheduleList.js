import { useEffect, useState } from "react"

function ScheduleList(props) { 
    console.log(props.schedule)
    let first = true;
    const monthStrings = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    let [dateConversion,setDateConversion] = useState(props.schedule.map(item => new Date(item.datetime)))

    const handleDateConvert = () => {
        let minutes, hours, day, month;
        if(props.schedule != undefined) {
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
        }
    }

    useEffect(() => {
        setDateConversion(props.schedule.map(item => new Date(item.datetime)))
    },[])
    handleDateConvert()
    
    let [list,setList] = useState(dateConversion)
    
    return (
        <>
        <div className="flex flex-col w-1/2 h-3/4">
        <h2 className="border-t border-l border-r rounded-tl-md w-3/4 mx-auto rounded-tr-md border-black bg-gray-200">Schedule</h2>
            <div className="border p-1 h-full border-black rounded-br rounded-bl w-3/4 m-auto bg-white  ">
                <ul className="h-full overflow-y-scroll">
                    {list == undefined ? <h1>No schedule has been set</h1>:
                    list.map(listItem => <li className="border-2 m-1 bg-gray-100">{listItem}</li>)}
                </ul>
            </div>
        </div>
        </>
    )
}

export default ScheduleList