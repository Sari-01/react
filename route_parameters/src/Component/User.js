import React from "react";
import { useParams } from "react-router-dom";

export default function User(){
    const {id}=useParams()
    // useParams is a hook used to  Get the userId param from the URL.
    // the id should be id since we have given the name 'id' in app.js
    return(
        <>
        <h1>User Profile</h1>
        <p>User id is <b>{id}</b></p>
        </>
    )
}