import React from "react";

class Scooty extends React.Component{
    constructor(){
        super();
        this.state={color:'blue',model:'fascino'}
    }
    render(){
        return(
            <>
            <h1>My Scooty is {this.state.color} and the model is {this.state.model}</h1>
            <button onClick={()=>this.setState((previousState)=>
                {return{...previousState,color:'black',model:'activa'}})}>Change details</button>
            </>
        )
    }
}

export default Scooty