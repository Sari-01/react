import React from "react";

class ClassCompo extends React.Component{
    render(){
        // to use properties in class component we have to use as below
        const{appleInfo}=this.props
        const{color,type}=appleInfo
        return(
            <h2>{`This is using class component. This is ${color} ${type} apple`}</h2>
        )
    }
}

export default ClassCompo