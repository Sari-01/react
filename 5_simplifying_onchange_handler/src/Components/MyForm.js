import { useState } from "react";

function MyForm(){

    const [input,setInput]=useState({})

    function handleSubmit(e){

        e.preventDefault();
        console.log("Form submitted")
        console.log("current name",input)
    }

    function handleChange(e){
        const name=e.target.name;
        const value=e.target.value
        // console.log("name&value",e.target.name,e.target.value)
        setInput((previousState)=>{return {...previousState,[name]:value}})
        // the value of name should be given in the square bracket so that it can take for every input field and match with the values
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>Enter a name:<input type='text' name="name" onChange={handleChange}/></label><br />
            <label>Enter age:<input type='text' name='age' onChange={handleChange}/></label><br />
            <label>Enter email:<input type='text' name='email' onChange={handleChange}/></label><br />
            <input type='submit' value='Submit form' />

            {/* the name in the input field helps to map . the name and value is used in the form of key&value pairs */}
        </form>
    )
}

export default MyForm;

// the above code is the procedure which is reduced from the before method. the onchange event is done in a specific part
// and it is executed separately in a function