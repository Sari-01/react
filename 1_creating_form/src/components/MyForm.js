import { useState } from "react";

function MyForm(){

    const [name,setName]=useState("") 
    // in the beginning the input text will be empty so we are setting the state as empty in the beginning
    return (
        <form>
            <label>Enter ur name <br></br><input type='text' /></label>
        </form>
    )
}

export default MyForm;