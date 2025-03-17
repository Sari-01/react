import { useState, useEffect } from 'react';
import './Signup.css'
import { Link, useNavigate } from 'react-router-dom';

function Signup(message) {
    let { additionalData } = message
    console.log(additionalData.message)

    const navigate = useNavigate()

    const [isSignupSuccessful, setIsSignupSuccessful] = useState(false); // Track signup success
    const [countries, setCountries] = useState([])
    const [inputs, setInputs] = useState({
        Name: "",
        Gender: "",
        PhoneNumber: "",
        Date_Of_Birth: "",
        Password: "",
        Country: "",
        Address: "",
        Email: ""
    })
    const [messages, setMessages] = useState("")
    const [popup, setPopup] = useState(false)

    useEffect(() => {
        // Fetch countries from backend
        fetch('http://localhost:8080/fetching_details/countries')
            .then(response => response.json())
            .then(data => {
                console.log(data);  // Log the array to see if it's being fetched properly
                setCountries(data);
            })
            .catch(error => console.error('Error fetching countries:', error));
    }, []);

    // function onSubmit(e) {
    //     console.log("LOPOP")
    //     e.preventDefault()
    //     if (!inputs.Name || !inputs.Gender || !inputs.PhoneNumber || !inputs.Date_Of_Birth || !inputs.Country || !inputs.Address || !inputs.Email) {
    //         setMessages("All fields are required!!!")
    //     }
    //     const reqData = {
    //         Name: inputs.Name,
    //         Gender: inputs.Gender,
    //         PhoneNumber: inputs.PhoneNumber,
    //         Date_Of_Birth: inputs.Date_Of_Birth,
    //         Country: inputs.Country,
    //         Address: inputs.Address,
    //         Email: inputs.Email
    //     }
    //     fetch(`http://localhost:8080/routes/signup`, {
    //         method: "POST",
    //         headers: {
    //             'Context-type': 'application/json'
    //         },
    //         body: JSON.stringify(reqData)
    //     })
    //     .then(async response => {
    //         if (!response.ok) {
    //             const errorData = await response.json(); // Parse response body as JSON
    //             console.log("Error Data:", errorData); // Log the entire error response
    //             throw errorData.errors; // Throw the errors array for further handling
    //         }})
    //         .then((data) => {
    //             console.log("Data", data.errors)
    //         })
    //         .catch((Error) => {
    //             console.log('error', Error)
    //             // setMessages(Error)
    //         })
    //         .catch((err) => {
    //             console.log("ERRRRRRRRRRR", err)
    //         })
    // }

    function onSubmit(e) {
        e.preventDefault();

        if (!inputs.Name || !inputs.Gender || !inputs.PhoneNumber || !inputs.Date_Of_Birth || !inputs.Country || !inputs.Address || !inputs.Email) {
            setMessages("All fields are required!!!");
            setPopup(true)
            return;
        }

        const reqData = {
            Name: inputs.Name,
            Gender: inputs.Gender,
            PhoneNumber: inputs.PhoneNumber,
            Date_Of_Birth: inputs.Date_Of_Birth,
            Country: inputs.Country,
            Address: inputs.Address,
            Email: inputs.Email
        };

        fetch(`http://localhost:8080/routes/signup`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqData)
        })
            .then(async response => {
                if (!response.ok) {
                    const errorData = await response.json(); // Parse response body as JSON
                    console.log("Error Data:", errorData); // Log the entire error response
                    throw errorData.errors; // Throw the errors array for further handling
                }
                return response.json();
            })
            .then(data => {
                setPopup(true)
                console.log("Signup successful:", data);
                setIsSignupSuccessful(true);
                setMessages("Signup successful! You will be sent a temporary password and the userId to the registered email. Login using that to reset the password");
            })
            .catch(errors => {
                console.error("Signup errors:", errors);

                // Display all errors as a single string or formatted message
                // setMessages(errors.join(", "));
                setPopup(true)
                setMessages(errors.join(". "))
            });
    }

    const closePopup = () => {
        setPopup(false); // Close the popup
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleNavigation = () => {
        setPopup(false)
        if (isSignupSuccessful) {
            navigate('/')
        }
    }

    return (
        // <form onSubmit={onSubmit}>
        <div className="signup-container">
            <h1>Signup</h1>
            <h1>{`${additionalData.message}`}</h1>
            <div className="signup-square">
                <label>Name:<input type='text' name='Name' onChange={handleChange} autoComplete='off' /></label><br />
                <div className='gender-group'>
                    <label>Gender:</label>
                    <label><input type='radio' name='Gender' onChange={handleChange} value='Male' />Male</label>
                    <label><input type='radio' name='Gender' onChange={handleChange} value='Female' />Female</label>
                    <label><input type='radio' name='Gender' onChange={handleChange} value='Others' />Others</label>
                </div>
                <label>PhoneNumber:<input type='text' name='PhoneNumber' onChange={handleChange} autoComplete='off' /></label><br />
                <label>Date Of Birth:<input type='date' name='Date_Of_Birth' onChange={handleChange} /></label><br />
                {/* <label>Password:<input type='password' name='Password' onChange={handleChange} /></label><br /> */}
                <label>Country:
                    <select name="Country" onChange={handleChange}>
                        <option value="">Select</option>
                        {countries.map((country, index) => (
                            <option key={index} name='Country' value={country}>{country}</option>
                        ))}</select></label><br />
                <div className="address-group">
                    <label>Address:<textarea rows="4" cols="50" name='Address' onChange={handleChange}></textarea></label><br /></div>
                <label>Email:<input type='email' name='Email' onChange={handleChange} autoComplete='off' /></label><br />
                <input type='submit' value='Submit' onClick={onSubmit} />
                <Link to='/'><button>Cancel</button></Link>
                {/* <p>{messages}</p> */}
            </div>
            {popup && (
                <div className="popup-signup">
                    <div className="popup-content-signup">
                        <h2>KINDLY NOTE</h2>
                        {(isSignupSuccessful) ? (
                            <>
                                <p>{messages}</p>
                                <button className="success_signin" onClick={handleNavigation}>Ok</button>
                            </>
                        ) : (
                            <><p>{messages}</p>
                                <ul>
                                    <button className="error_in_signin" onClick={closePopup}>Close</button>
                                </ul></>
                        )}
                    </div>
                </div>
            )}
        </div>
        // </form>
    )
}

export default Signup;