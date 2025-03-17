import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import './ThemeToggle.css'
function ThemeToggle(){
    const [theme,setTheme]=useState(localStorage.getItem('theme')||'light')

    useEffect(()=>{
        document.documentElement.setAttribute('data-theme',theme)
        localStorage.setItem('theme',theme)
    },[theme])

    function toggleTheme(){
        setTheme((prevTheme)=>(prevTheme==='light'?'dark':'light'))
    }
    return (
        <div className="theme-toggle">
            <button onClick={toggleTheme}>
                <FontAwesomeIcon icon={theme==='light'?faSun:faMoon }/>
                <span className="button-label">
                    {theme==='light'?'Light Mode':' Dark Mode'}
                </span>
            </button>
        </div>
    )
}

export default ThemeToggle;