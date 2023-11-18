

function CompartmentMenu(props) {
    return (
        <div id="compartment-menu" className="bg-white h-40 w-10/12">
            <h3>Compartment {props.compartment.id}</h3>

            <div id="dose-time" className="">
                <p>Time Until Dose</p>
                <p>Note: List datetimes here</p>
            </div>
        </div>
    )
}

export default CompartmentMenu;