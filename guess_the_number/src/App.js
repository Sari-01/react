
import { useState } from 'react';
import './App.css';
import Result from './Component/result';

const secretNum=Math.floor(Math.random()*10)+1
// this is declared in the beginning . if this is inclueded inside the app function , it will switch everytime and we cannot get the proper output
// the +1 is used to give number 10. the floor will give till 9 so we add +1 to that.

function App() {
  const[term,setTerm]=useState("")

  const handleChange=(e)=>{
    setTerm(e.target.value)
  }
  return (
    <div className="container">
      <div className='head'>
        <label htmlFor='term'>Guess the number between 1 to 10</label>
        {/* <label>Guess the number between 1 to 10 </label> */}
        {/* html for ---> This ensures that the label is correctly associated
        with the input field, maintaining accessibility and user interaction. */}
      </div>
      <input
      // id='term'
      type='text'
      name='term'
      onChange={handleChange}
      />
      <Result secretNum={secretNum} term={term}/>
    </div>
  );

}

export default App;
