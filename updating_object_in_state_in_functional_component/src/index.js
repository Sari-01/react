import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Scooty from './Component/Scooty';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>   
    <Scooty/>
  // </React.StrictMode>
);


// on using react.strictMode we get two times the console. so for that case we remove the strict mode

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
