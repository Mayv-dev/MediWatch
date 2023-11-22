import { useEffect, useState } from "react";
import CalendarMenu from "./CalenderMenu";

const DAYSOFWEEK = {
    "1": "Monday",
    "2": "Tuesday",
    "3": "Wednesday",
    "4": "Thursday",
    "5": "Friday",
    "6": "Saturday",
    "0": "Sunday",
};

function DatesBar(props) {
    const [currentDate, setCurrentDate] = useState({});
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDateDoses, setselectedDateDoses] = useState([]);

    function setUpCurrent() {
        let cDate = new Date();

        let day = cDate.getDay();
        let date = cDate.getDate();
        let month = cDate.getMonth();

        if (Object.keys(currentDate).length === 0) {
            setCurrentDate({
                Day: DAYSOFWEEK[day],
                DayNum: date,
                Month: month + 1,
            });

            setDates([
                { Day: DAYSOFWEEK[day], DayNum: date, Month: month + 1 },
            ]);

            for (let i = 1; i < 4; i++) {
                let cDate = new Date();
                cDate.setDate(cDate.getDate() + i);

                let day = cDate.getDay();
                let date = cDate.getDate();
                let month = cDate.getMonth();

                setDates((prevState) => [
                    ...prevState,
                    { Day: DAYSOFWEEK[day], DayNum: date, Month: month + 1 },
                ]);
            }

            for (let i = 1; i < 4; i++) {
                let cDate = new Date();
                cDate.setDate(cDate.getDate() - i);

                let day = cDate.getDay();
                let date = cDate.getDate();
                let month = cDate.getMonth();

                setDates((prevState) => [
                    { Day: DAYSOFWEEK[day], DayNum: date, Month: month + 1 },
                    ...prevState,
                ]);
            }
        }
    }

    useEffect(() => {
        let timer = setInterval(() => setCurrentDate(new Date()), 1000);
        setUpCurrent();

        return function cleanup() {
            clearInterval(timer);
        };
    }, []);

    const prevDate = () => {
        
    };

    const nextDate = () => {

    };

    const handleMenu = (e) => {
        const [dayNum, month] = e.currentTarget.id.split(' ');
        setSelectedDate({ dayNum, month });
        setselectedDateDoses([])
        props.userInfo.schedule.forEach(element => {
            const date = new Date(element.datetime);
            if (date.getDate() === parseInt(dayNum) && date.getMonth() + 1 === parseInt(month)) {
                setselectedDateDoses((prevState) => [...prevState, element]);
            }
        }); 
    }

    if (dates.length === 0) {
        return <div>Loading</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center space-y-2">
            <div className="flex items-center space-x-2">
                <button
                    className="bg-slate-500 rounded-sm p-1"
                    onClick={null}
                >
                    Prev Date
                </button>

                {dates.map((date) => (
                    <div key={date.DayNum} id={date.DayNum + ' ' + date.Month} className="flex-1 cursor-pointer" onClick={handleMenu}>
                        <div className="bg-gray-200 p-2 rounded-md text-center">
                            <p className="text-lg font-semibold">{date.Day}</p>
                            <p className="text-sm">
                                {date.DayNum}/{date.Month}
                            </p>
                        </div>
                    </div>
                ))}

                <button
                    className="bg-slate-500 rounded-sm p-1"
                    onClick={null}
                >
                    Next Date
                </button>
            </div>
            { selectedDate !== null && <CalendarMenu doses={selectedDateDoses}/> }
        </div>


    );
}

export default DatesBar;
