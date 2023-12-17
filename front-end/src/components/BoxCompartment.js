// use-sound code was taken from https://www.npmjs.com/package/use-sound
import { useSound } from 'use-sound';
import {useEffect} from 'react'
import alert from '../sounds/beep-06.mp3';

function BoxCompartment(props) {
    let selected = Math.abs(Date.parse(props.item.datetime)-Date.now()) < 1800000 ? "compartmentDiv bg-green-500" : props.colour ?  "compartmentDivSelected" : "compartmentDiv bg-white "
    
    const [play] = useSound(alert);

    useEffect(() => {
        if(Math.abs(Date.parse(props.item.datetime)-Date.now()) < 1800000) play()
    })
    
    return (
        <div className={selected + " h-20 w-20"} onClick={() => props.onSelection(props.identifier)}>
        {Math.abs(Date.parse(props.item.datetime)-Date.now()) < 3600000 ? 
            Math.abs(Date.parse(props.item.datetime)-Date.now()) < 1800000 ? <p>Due Now</p> : <p>Due Soon</p>
            :null}
        </div>
    )
}

export default BoxCompartment