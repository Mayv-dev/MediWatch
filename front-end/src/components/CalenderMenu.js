function CalendarMenu(props) {
    return (
        <div className="flex flex-col items-center justify-center space-y-2">
            <table className="table-auto">
                <thead className="bg-gray-200">
                    <tr className="text-left">
                        <th className="px-4 py-2">Dose Time</th>
                        <th className="px-4 py-2">Status</th>
                    </tr>
                </thead>
                <tbody className="text-left">
                    {props.doses.map((dose) => {
                        const dateTime = new Date(dose.datetime);
                        const hours = dateTime.getHours();
                        const minutes = dateTime.getMinutes();

                        // Add leading zeros to minutes and hours
                        const formattedHours = hours < 10 ? `0${hours}` : hours;
                        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

                        return (
                            <tr className="bg-gray-100 border-b border-gray-200" key={dose.id}>
                                <td className="px-4 py-2">{`${formattedHours}:${formattedMinutes}`}</td>
                                <td className="px-4 py-2">N/A</td>
                            </tr>
                        );
                    })}


                </tbody>
            </table>
        </div>
    )

}

export default CalendarMenu