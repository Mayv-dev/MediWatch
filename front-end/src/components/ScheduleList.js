import { useEffect, useState } from "react"
import {SERVER_HOST} from "../config/private_global_constants";

function ScheduleList(props) { 
    const monthStrings = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    let [dateConversion,setDateConversion] = useState(props.schedule !== undefined ? {id: props.schedule.map(item => item.id), datetime: props.schedule.map(item => new Date(item.datetime))} : null)
    
    const handleDateConvert = () => {
        let minutes, hours, day, month;

        if(props.schedule != undefined && props.schedule != null && dateConversion !== null) {
            dateConversion =  dateConversion.datetime.map((date, index) => {
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

                return {id: dateConversion.id[index], datetime: day + " " + month + " " + date.getFullYear() + " - " + hours + ":" + minutes}
            })
        }
    }
    
    

    useEffect(() => {
        setDateConversion(props.schedule !== undefined ? {id: props.schedule.sort((a,b)=> a.datetime>b.datetime?1:-1).map(item => item.id), datetime: props.schedule.sort((a,b)=> a.datetime>b.datetime?1:-1).map(item => new Date(item.datetime))}: null)
    },[props.schedule])
    handleDateConvert()
    
    let [list,setList] = useState(dateConversion)
  
    
    const deleteDose = (e) => {
        const sId = e.currentTarget.id

        fetch(`${SERVER_HOST}/user/${props.userID}/schedule/${sId}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(() => {
            alert('Box Deleted')
        }).then(() => {
            const temp = list.filter(schedule => schedule.id !== sId)
            setList(temp)
        }).then(() => {
            props.deleteSchedule(sId)
        })
    }


    return (
        <>
        <div className="flex flex-col w-1/2 h-3/4">
        <h2 className="border-t border-l border-r rounded-tl-md w-3/4 mx-auto rounded-tr-md border-black bg-gray-200">Schedule</h2>
            <div className="border p-1 h-full border-black rounded-br rounded-bl w-3/4 m-auto bg-white  ">
                <ul className="h-full overflow-y-scroll">
                    {dateConversion == undefined && list == null ? <h1>No schedule has been set</h1>:
                    dateConversion.map(listItem => <li className="border-2 m-1 bg-gray-100 flex justify-around items-center">
                        {listItem.datetime}
                        <button id={listItem.id}  onClick={deleteDose} className="bg-red-600 rounded-md p-1 hover:bg-red-700">Delete Dose</button>
                    </li>)
                    }                    
                </ul>
            </div>
        </div>
        </>
    )
}

export default ScheduleList