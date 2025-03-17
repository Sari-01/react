// import { useState } from "react";

// function MyForm(){

//     const [name,setName]=useState("")
//     const [age,setAge]=useState("")
//     const [email,setEmail]=useState("")

//     function handleSubmit(e){

//         e.preventDefault();
//         console.log("Form submitted")
//         console.log("current name",name,age,email)
//     }

//     return(
//         <form onSubmit={handleSubmit}>
//             <label>Enter a name:<input type='text' onChange={(e)=>{setName(e.target.value)}}/></label><br />
//             <label>Enter age:<input type='text' onChange={(e)=>{setAge(e.target.value)}}/></label><br />
//             <label>Enter email:<input type='text' onChange={(e)=>{setEmail(e.target.value)}}/></label><br />
//             <input type='submit' value='Submit form' />
//         </form>
//     )
// }

// export default MyForm;

// the above code is ok when the state is called indivually . To call using a single way we use object as below


// import { useState } from "react";

// function MyForm(){

//     const [input,setInput]=useState({})

//     function handleSubmit(e){

//         e.preventDefault();
//         console.log("Form submitted")
//         console.log("current name",input)
//     }

//     return(
//         <form onSubmit={handleSubmit}>
//             <label>Enter a name:<input type='text' onChange={(e)=>{setInput({name:e.target.value})}}/></label><br />
//             <label>Enter age:<input type='text' onChange={(e)=>{setInput({age:e.target.value})}}/></label><br />
//             <label>Enter email:<input type='text' onChange={(e)=>{setInput({email:e.target.value})}}/></label><br />
//             <input type='submit' value='Submit form' />
//         </form>
//     )
// }

// export default MyForm;

// the above code gives only the o/p for the last input what u give as input in the input field. refer console.
// to get the whole object value the above code is altered as below

import { useState } from "react";

function MyForm(){

    const [input,setInput]=useState({})

    function handleSubmit(e){

        e.preventDefault(); // helps to avoid the browser refresh
        console.log("Form submitted")
        console.log("current name",input)
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>Enter a name:<input type='text' onChange={(e)=>{setInput((previousState)=>{return {...previousState,name:e.target.value}})}}/></label><br />
            <label>Enter age:<input type='text' onChange={(e)=>{setInput((previousState)=>{return {...previousState,age:e.target.value}})}}/></label><br />
            <label>Enter email:<input type='text' onChange={(e)=>{setInput((previousState)=>{return{...previousState,email:e.target.value}})}}/></label><br />
            <input type='submit' value='Submit form' />
        </form>
    )
}

export default MyForm;