import { useNavigate } from "react-router-dom"
import React from "react"

export default function Login(){

    const navigate=useNavigate()

    function onsubmit(){
        navigate('/navigate_to_dashboard')

    }

    return (
        <>
        <h1>Login</h1>
        <button onClick={onsubmit}>Login</button>
        </>
    )
}