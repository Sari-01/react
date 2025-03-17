import { useState } from "react";

function Car(){
    const [color,setColor]=useState('Blue')
    const [brand,setBrand]=useState('xxx')
    const [year,setYear]=useState(2000)
    const [type,setType]=useState('dddd')
    return(
        <>
        <h1>My car</h1>
        <p>color:{color}</p>
        <p>brand:{brand}</p>
        <p>year:{year}</p>
        <p>type:{type}</p>
        </>
    )
}

export default Car;


// this is how the we need to use mulitple state in one component