// this is for property coming from the same component.

// function Ans(){
//     const reply_name='Vis'
//     return (
//       <h1> {`Hello ${reply_name}, absolutely fine!`}</h1>
//     )
//   }

// this is for property coming from the other component

function Ans(props){
    console.log("Propertiesssss",props)
    // const {reply_name,your_qn}=props
    // the above code is used when the properties are send one by one
    const {toAsk}=props
    const {reply_name,your_qn}=toAsk
    // the above code is used when the properties are send altogether as object.
    return(
        <h1>{`Hello ${reply_name}, absolutely fine! ${your_qn}`}</h1>
    )
}

  export default Ans;



//   In summary, if you're returning plain text, you don't need curly braces,
// just place the text directly inside the JSX. If you're using a variable or an expression, use curly braces.