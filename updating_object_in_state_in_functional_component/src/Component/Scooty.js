import { useState } from 'react'

export default function Scooty() {
    const [scooty, setScooty] = useState({
        color: 'blue',
        type: 'fascino',
        year: 2023
    })

    function updateDetails() {
        setScooty((previousStateValues) => {
            return { ...previousStateValues, color: 'Black' }
        })
    }
    console.log("Current state valuessss", scooty)
    return (
        <>
            <h1>My Scooty </h1>
            <p>color:{scooty.color}</p>
            <p>type:{scooty.type}</p>
            <p>year:{scooty.year}</p>
            <button onClick={updateDetails}>Change</button>
        </>
    )
}


//  we should not set the component name and the state name as same. if it happens it throws the sonarlint warning
