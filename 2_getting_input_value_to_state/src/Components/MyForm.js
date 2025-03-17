import { useState } from "react";

function MyForm(){

    const[name,setName]=useState("")
    console.log('current name', name)

    return(
        <form>
            <label>Enter ur name <br></br> <input type='text' onChange={(e)=>{setName(e.target.value)}}/></label>
            {/* e.target.value gives the value of the input */}
        </form>
    )

}

export default MyForm;
