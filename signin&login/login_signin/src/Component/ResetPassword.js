import { useLocation, Link, useNavigate } from 'react-router-dom';
import './ResetPassword.css'
import { useState } from 'react';

function ResetPassword() {
    const navigate = useNavigate()
    const location = useLocation();
    const message = location.state?.message;
    const curr_userId = location.state?.UserId

    const [inputs, setInputs] = useState({
        UserId: curr_userId,
        NewPassword: ""
    })
    const [messages, setMessages] = useState("")
    const [showPopup, setShowPopup] = useState(false)
    const [isResetPasswordSuccess, setResetPasswordSuccess] = useState(false)

    const resetPassword = (e) => {
        e.preventDefault()
        setShowPopup(true)
        console.log("RESETTING PASSWORD")
        console.log("!IIIIII", !inputs.UserId)
        if (!inputs.UserId) {
            // setResetPasswordSuccess(false);
            setMessages("All fields are required")
            return
        }
        const reqData = {
            UserId: inputs.UserId,
            NewPassword: inputs.NewPassword
        }
        fetch(`http://localhost:8080/routes/resetPassword`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(reqData)
        })
            .then(async response => {
                if (!response.ok) {
                    const errorData = await response.json()
                    console.log("ERRRRRR", errorData.errors[0])
                    throw (errorData.errors);
                }
                console.log(response)
                return response.json()
            })
            .then((data) => {
                console.log("NEWWWWWWWWW", data)
                setShowPopup(true);
                setResetPasswordSuccess(true)
                // navigate('/')
                setMessages("Successfully you have changed the password . Login again with new password")
            })
            .catch((errors) => {
                console.log("SOMEEE ERROR", errors)
                // setMessages(errors.errors || "Something went wrong. Please try again.")
                setMessages(errors)
            })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const retry = () => {
        setShowPopup(false)
        setMessages("")
        navigate('/resetPassword')
    }

    const handlesubmission = () => {
        setShowPopup(false)
        setMessages("")
        navigate('/')
    }
    return (
        <div className='resetPassword'>
            <h1>ResetPassword</h1>
            <div className='scrolling-text'>
                <p>{message}</p>
            </div>
            <div className='input-fields'>
                <label>UserId :<input type='text' name='UserId' autoComplete='off' onChange={handleChange} value={inputs.UserId} disabled /></label><br />
                <label>New Password :</label><input type='password' autoComplete='off' onChange={handleChange} name='NewPassword' /><br />
                <button className='reset-password' onClick={resetPassword}>Reset Password</button>
                <Link to='/'><button className='cancel-reset'>Cancel</button></Link>
            </div>
            {showPopup && (
                <div className='popup'>
                    <div className='popup-content-reset'>
                        <h2>Attention</h2>
                        {(isResetPasswordSuccess) ? (
                            <><p>{messages}</p>
                                <button className='back-home' onClick={handlesubmission}>OK</button></>
                        ) : (<><p>{messages}</p>
                            <button className='back' onClick={retry}>OK</button></>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ResetPassword;