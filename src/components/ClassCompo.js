import React from "react"

class ClassCompo extends React.Component{
    render(){
        const {appleInfo}=this.props
        const {color,type}=appleInfo
        return(
            <h2>{`This is using class component.This is ${color} ${type} apple`}</h2>
        )
    }
}

export default ClassCompo;