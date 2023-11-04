

function CompartmentMenu(props) {
    return (
        <div id="compartment-menu">
            <h3>Compartment {props.compartment.compartment}</h3>

            <div id="dose-time">
                <p>Time Until Dose</p>
                <p>{props.compartment.doseDatetime}</p>
            </div>
        </div>
    )
}

export default CompartmentMenu;