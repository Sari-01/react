import Ans from './Ans'
import ClassCompo from './ClassCompo'


function Qn(){
    const toAsk={reply_name:'Vis',your_qn:'What about you?'}

    const appleInfo={color:'Red',type:'Shimla'}

    const list=[
        {reply_name:'Sank',your_qn:'How are you?'},
        {reply_name:'Nae',your_qn:'hehee'},
        {reply_name:'Jefy',your_qn:'Yourself?'}
    ]

    const list_key_array_set=[1,2,3,4,5,6,7,8,9]
    return(
        <>
        <h1>Hey,How are you?</h1>
        <Ans toAsk={toAsk}/>
        <ClassCompo appleInfo={appleInfo}/>
        <ul>
        {list.map((toAskElement)=><li key={toAskElement.reply_name}><Ans toAsk={toAskElement}/></li>)}

        {/* the key in the above line is called as list keys. The key should be used which is identified as unique key
        in the given array list */}
        </ul>

        <ul>
        {list_key_array_set.map((value,index)=><li key={index}><p>{value}</p></li>)}
        {/* if the list is like an array you can use indx for the key */}
        </ul>
        </>
    )
}

export default Qn;