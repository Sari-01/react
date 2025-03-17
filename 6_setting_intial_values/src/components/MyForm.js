import { useState } from "react"

function MyForm(){
    const [input,setInput]=useState({phone:'+91',country:'India',email:'@gmail.com'})

    // these values helps to set the values at the beginning itself

    function handleSubmit(e)
    {
        e.preventDefault()
        console.log('Form Submitted!')
        console.log("current state",input)
    }

    function handleChange(e){
        const name=e.target.name
        const value=e.target.value;
        setInput((previousState)=>{return {...previousState,[name]:value}})

    }
    return(
        <form onSubmit={handleSubmit}>
            <label>Enter ur name:<input type="text" name='name'onChange={handleChange} /></label><br />
            <label>Enter ur age:<input type="text" name='age' onChange={handleChange}/></label><br />
            <label>Enter ur email:<input type="text" name='email'onChange={handleChange} value={input.email}/></label><br />
            <label>Enter ur phone:<input type="text" name='phone'onChange={handleChange} value={input.phone}/></label><br />
            <label>Enter ur Country:
                <select name="Country" onChange={handleChange} value={input.country}>
                <option value=" ">Select</option>
                <option value="-----">-----</option>
                <option value="India">India</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                </select></label><br />
            <input type='submit' value='Submit form' />
        </form>
    )
}

// the value after onchange in the country, phone & email helps to set the intial values directly

export default MyForm;