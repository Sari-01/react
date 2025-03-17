// function FavColor(){
//     let color='blue'
//     return(
//         <>
//          <h1>My fav color is {color}</h1>
//          <button onClick={()=>{color='red'}}>Change Color</button>
//         </>
//     )
// }


// the below code is used for functional state hook. the react doesn't know the value has to be changed so we use state
// usestate provides 2 properties: here they are color and setColor, setColor is the function of Color

import {useState} from 'react'

function FavColor(){
    let [color,setColor]=useState('Blue')
    return(
        <>
        <h1>My fav color is {color}</h1>
        <button onClick={()=> setColor('Red')}>Change Color</button>

        {/* the below code is : if the color is blue then it changes to red , if red then it chagned to blue
        it is done with ternary operator for fliping according to our condition */}
        {/* <button onClick={()=>{setColor(color==='red'?'blue':'red')}}>Change color</button> */}
        </>
    )
}

export default FavColor;