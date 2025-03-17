import { useState } from "react"

export default function Login(){
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [message,setMessage]=useState("")
    function signupHandler(){
        setMessage("Loading....")
        if(email=== 'sariha@gmail.com' && password === 'test@123'){
            setTimeout(()=>{
                setMessage("Successfully logged in")
            },3000)
        }
        else{
            setTimeout(()=>{
                setMessage('Invalid credentials')
            },3000)
        }
    }
    return (
        <div>
            <h1>Login</h1>
            <input type='text' placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/><br/><br/>
            <input type='password' placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/><br/><br/>
            <button onClick={signupHandler}>Signup</button><br/><br/>
            {message && <p>{message}</p>}
        </div>
    )
}