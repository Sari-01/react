import { useState } from "react"

export default function Scooty(){
    const [scooty,setScooty]=useState({
        color:'blue',
        year:2023,
        type:'fascino'
    })
    return(
        <>
        <h1> My Scooty </h1>
        <p>color:{scooty.color}</p>
        <p>Year:{scooty.year}</p>
        <p>Type:{scooty.type}</p>
        </>
    )

}