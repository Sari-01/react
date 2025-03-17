import Ans from './Ans'
import ClassCompo from './ClassCompo';

function Qn(){
    // const Ans_name='Vis'  ====> for passing one by one props

    const toAsk={reply_name:'Vis',your_qn:'What about you?'}

    // when the properties are not sent then the output we get as undefined. the below code is used for that
    // const toAsk={}

    // the below code is for class component
    const appleInfo={color:'red',type:"Shimla"}

    const toAskInfo=toAsk.reply_name!==undefined && toAsk.your_qn!==undefined  
    // this like is used (ref : *****)

    const isApple=true
    // this line is used to show how conditional rendering works type :2
    return(
        <>
        <h1>Hey, How r u?</h1>


        {/* this is called conditional rendering */}
        {/* {toAsk.reply_name!==undefined && toAsk.your_qn!==undefined?<Ans toAsk={toAsk}/>:null}  */}
        {/* the above line says when the properties are sent then it shows else it will not */}

         {/* the above line can be altered as below */}
         {/* (ref:*****) */}
        {toAskInfo?<Ans toAsk={toAsk}/>:null}

        {/* the improved code can be used as below */}
        {/* {toAskInfo&&<Ans toAsk={toAsk}/>} */}

        {/* <ClassCompo />    */} {/* this is class component */}
        <ClassCompo appleInfo={appleInfo}/>

        {isApple?<h2>Yes, apple is used</h2>:<h2>No, apple is not used</h2>}
        {/* this works based on the isApple value */}
        </>
    )
  }

export default Qn;


// note : to check and move to next you can use && else you can use the ternary operator itself