import { useState } from "react";

function List(){
    const [list,setList]=useState([])
    const [count,setCount]=useState(1)
    function addItem(){
        console.log("yesss")
        const itemName='item'+count
        setList((previousState)=>{return [...previousState,itemName]})
        setCount((previousState)=>{return previousState+1})
    }
    console.log(list)
    return(
    <>
    <h1>Lists</h1>
    <button onClick={addItem}>Add Item</button>
    <ul>{
        list.map((el,index)=> <li key={index}>{el}</li>)
        }
    </ul>
    </>)
}

export default List;