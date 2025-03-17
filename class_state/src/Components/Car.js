import React from 'react'


class Car extends React.Component{
    constructor(){
        super();
        this.state={color:'blue'}
    }
    render(){
        return (
            <>
            <h1>My Car color is {this.state.color}</h1>
            <button onClick={()=>{this.setState({color:'red'})}} >Change color</button>
            </>
        )
    }
}

// the code is an example for using state hook in a class component. that should be done using constructor


// super constructor --> it is used because, when the class car has to access the constructor and some properties(like state,setState)
//  from the class component(react.component ...> component is from this)

export default Car;