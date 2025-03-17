import Ans from './Ans'
import ClassCompo from './ClassCompo';

function Qn(){
    // const Ans_name='Vis'  ====> for passing one by one props

    const toAsk={reply_name:'Vis',your_qn:'What about you?'} 
    // the below code is for class component
    const appleInfo={color:'red',type:"Shimla"}
    return(
        <>
        <h1>Hey, How r u?</h1>
        {/* <Ans reply_name={Ans_name} your_qn="What about you?"/> */}
        {/* the above code is used when the properties are send one by one */}



        {/* instead of passing many props you can make all those props into an object then you can pass */}
        <Ans toAsk={toAsk}/>
        {/* <ClassCompo />    */} {/* this is class component */}
        <ClassCompo appleInfo={appleInfo}/>
        </>
    )
  }

export default Qn;