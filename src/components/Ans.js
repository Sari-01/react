function Ans(props){
    const {toAsk}=props
    const{reply_name,your_qn}=toAsk
    return(
      <h1>{`Hello ${reply_name}, absolutely fine! ${your_qn}`}</h1>
    )
}

export default Ans;