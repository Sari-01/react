import React from "react";
import { useParams } from "react-router-dom";

export default function User(){
    const {id}=useParams()
    return(
        <>
        <h1>User Profile</h1>
        <p>User id is <b>{id}</b></p>
        </>
    )
}