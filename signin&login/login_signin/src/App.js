import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';

function App() {
    const navigate = useNavigate()
    const [showPopup, setShowPopup] = useState(false)
    const [inputs, setInputs] = useState({
        UserId: "",
        Password: ""
    })
    const [messages, setMessages] = useState("")
    const [isPasswordReset, setIsPasswordReset] = useState(false)

    const togglePopup = () => {
        setShowPopup(true)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }
    const handleNavigation = (e) => {
        e.preventDefault();
        if (!inputs.UserId || !inputs.Password) {
            setMessages("All fields are required!!!")
            return
        }
        const reqData = {
            UserId: inputs.UserId,
            Password: inputs.Password
        }
        if (isPasswordReset) {
            navigate('/login')
        }
        fetch(`http://localhost:8080/routes/login`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(reqData)
        })
            .then(async response => {
                if (!response.ok) {
                    const errorData = await response.json()
                    console.log("ERRRRRRORRR DATA", errorData)
                    throw errorData.message
                }
                console.log(response)
                return response.json()
            })
            .then((data) => {
                console.log("NEWWWWWWWWW", data)
                if (data.code === 200) {
                    setMessages(data.message);
                    setIsPasswordReset(true); // Mark password as reset
                    navigate('/resetPassword', { state: { message: data.message, UserId: reqData.UserId } });
                } else {
                    // Successful login
                    navigate('/login');
                }
            })
            .catch((errors) => {
                console.log("SOMEEE ERROR", errors)
                setMessages(errors)
            })
        // setShowPopup(false);
        // navigate('/login')

    }
    // const handleNavigation = (e) => {
    //     e.preventDefault();

    //     if (!inputs.UserId || !inputs.Password) {
    //         setMessages("All fields are required!!!");
    //         return;
    //     }

    //     const reqData = {
    //         UserId: inputs.UserId,
    //         Password: inputs.Password
    //     };

    //     // If password is already reset, navigate directly without API call
    //     if (isPasswordReset) {
    //         navigate('/login');
    //         return;
    //     }

    //     // API call for login
    //     fetch(`http://localhost:8080/routes/login`, {
    //         method: "POST",
    //         headers: {
    //             'Content-type': 'application/json'
    //         },
    //         body: JSON.stringify(reqData)
    //     })
    //         .then(async (response) => {
    //             if (!response.ok) {
    //                 const errorData = await response.json();
    //                 throw errorData.message;
    //             }
    //             return response.json();
    //         })
    //         .then((data) => {
    //             console.log("Response:", data.message);

    //             if (data.message === "Password reset required") {
    //                 setMessages(data.message);
    //                 setIsPasswordReset(true); // Mark password as reset
    //                 navigate('/resetPassword', { state: { message: data.message, UserId: reqData.UserId } });
    //             } else {
    //                 // Successful login
    //                 navigate('/login');
    //             }
    //         })
    //         .catch((error) => {
    //             console.error("Error:", error);
    //             setMessages(error); // Display error message
    //         });
    // };

    const closePopup = (e) => {
        e.preventDefault()
        setShowPopup(false)
        setMessages("")
    }
    return (
        <div className="main-container">
            <h1>Welcome</h1>
            <div className="split-sections">
                <div className="left-section">
                    <div className="circle">
                        <img className='image' src="/login1.jpg" alt="Login profile pic" />
                    </div>
                </div>
                <div className="right-section">
                    <div className='square'>
                        <h1>Let's Get Into!!!!</h1>
                        <div className='button-group btn'>
                            <Link to='/signup'><button className='signup-btn'>Signup</button></Link>
                            <button className='login-btn' onClick={togglePopup}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
            {showPopup && (
                <div className='popup' >
                    <div className='popup-content'>
                        <h2>ResetPassword</h2>
                        <form>
                            <div className='form-group'>
                                <label>UserId:<input type='text' name='UserId' autoComplete='off' onChange={handleChange} /></label><br />
                                <label>Password:<input type='password' name='Password' autoComplete='off' onChange={handleChange} /></label><br />
                            </div>
                            <div className='btn-grp'>
                                <button className='submission' onClick={handleNavigation}>Submit</button>
                                <button className='cancellation' onClick={closePopup}>Cancel</button>
                            </div>
                            <p>{messages}</p>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App