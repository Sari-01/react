import { useState } from "react";

function MyForm(){

    const [name,setName]=useState('')

    // console.log("Current Name", name)

    function handleSubmit(e){
        // console.log("Form submitted")
        // console.log("current Name",name)

        // the above lines will work on clicking the submit button. But on submitting the form the page get refreshed everytime
        // to avoid that, the event (e) provides a function called preventDefault(). This will help to prevent the page from 
        // getting refreshed

        e.preventDefault()
        console.log("Form submitted",e)
        console.log("current name", name)

    }

    return(
        <form onSubmit={handleSubmit}>
            <label> Enter a name <br/><input type='text' onChange={(e)=>{setName(e.target.value)}} /><br></br></label>
            <input type="submit" value="submit form" />
        </form>
    )
}

export default MyForm;