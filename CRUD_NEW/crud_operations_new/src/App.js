import { useEffect, useState } from 'react';
import './App.css';
import { Button, Toaster } from '@blueprintjs/core';

const AppToasster = Toaster.create({
  position: "top-right"
})

function App() {

  const [users, setUsers] = useState([])
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [formData, setFormData] = useState({
    Id: "",
    Name: "",
    Class: "",
    Address: "",
    PhoneNumber: "",
  })
  const [isDisabled, setIsDisabled] = useState(false)

  // useEffect(() => {
  //   fetch("http://localhost:8000/routes/get_all")
  //     .then((response) => response.json())
  //     // this helps to get the response from the fetch, we need to convert them into json format . because that doesn't
  //     // know to get them in the json format.
  //     .then((json) => setUsers(json))
  //   // this helps to set the values that is got from the above json format
  // }, [setUsers])

  // the above code will work only if the nodejs code response is res.send(data)like this

  useEffect(() => {
    fetch("http://localhost:8000/routes/get_all")
      .then((response) => response.json()) // Parse JSON response
      .then((data) => {
        if (data.code === 200 && Array.isArray(data.msg)) {
          setUsers(data.msg); // Set users to the array in `msg`
        } else {
          console.error("Unexpected API response:", data);
          setUsers([]); // Fallback to an empty array if response is invalid
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setUsers([]); // Fallback to an empty array in case of error
      });
  }, []);

  function click() {
    console.log("Add user button is clicked")
    setIsPopupOpen(true)
    setMessage("")
    setFormData({
      Id: "",
      Name: "",
      Class: "",
      Address: "",
      PhoneNumber: ""
    })
    setIsDisabled(false);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleCreatePopup = () => {
  //   if (
  //     !formData.Id ||
  //     !formData.Name ||
  //     !formData.Class ||
  //     !formData.Address ||
  //     !formData.PhoneNumber
  //   ) {
  //     setMessage("All fields are required!");
  //     return;
  //   }

  //   const reqData = {
  //     Id: formData.Id,
  //     Name: formData.Name,
  //     Class: formData.Class,
  //     Address: formData.Address,
  //     PhoneNumber: formData.PhoneNumber,
  //   }
  //   fetch("http://localhost:8000/routes/create", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(reqData)
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("DATA", data)
  //       if (data.code === 200) {
  //         setMessage(data.msg)
  //         setUsers((prevUsers) => [...prevUsers, reqData]);
  //         AppToasster.show({
  //           message: "Successfully added",
  //           timeout: 3000,
  //           intent: 'success'
  //         })
  //         setIsPopupOpen(false)
  //         setFormData({
  //           Id: "",
  //           Name: "",
  //           Class: "",
  //           Address: "",
  //           PhoneNumber: ""
  //         })
  //         setMessage("")
  //       }
  //       else {
  //         // console.log("IT is coming here")
  //         setMessage(data.msg)
  //         AppToasster.show({
  //           message: data.msg,
  //           timeout: 3000,
  //           intent: 'danger'
  //         })
  //       }
  //     })
  // }

  const handleClosePopup = () => {
    setIsPopupOpen(false)
    setIsDisabled(false)
    setFormData({
      Id: "",
      Name: "",
      Class: "",
      Address: "",
      PhoneNumber: ""
    })
    setMessage("")
    AppToasster.show({
      message: "Current Users",
      timeout: 3000,
      intent: 'success'
    })
  }

  const handleUpdate = (Id) => {
    const user_info = users.find((user) => user.Id === Id)
    console.log("user_info", user_info)
    setIsPopupOpen(true)
    setIsDisabled(true)
    setMessage("")
    setFormData({
      Id: user_info.Id,
      Name: user_info.Name,
      Class: user_info.Class,
      Address: user_info.Address,
      PhoneNumber: user_info.PhoneNumber,
    })
  }

  const handleDelete = (Id) => {
    const user_delete = users.find((user) => user.Id === Id)
    console.log(user_delete)
    fetch('http://localhost:8000/routes/delete', {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user_delete)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("DATA DELETE", data)
        setUsers((prevUsers) => prevUsers.filter((user) => user.Id !== Id))
        AppToasster.show({
          message: data.msg,
          timeout: 3000,
          intent: 'success'
        })
        setMessage(data.msg)
        setIsPopupOpen(false)
      })
      .catch((err) => {
        AppToasster.show({
          message: "Something went wrong while deleting",
          timeout: 3000,
          intent: 'danger'
        })
      })
  }

  const handleSubmission = () => {
    if (
      !formData.Id ||
      !formData.Name ||
      !formData.Class ||
      !formData.Address ||
      !formData.PhoneNumber
    ) {
      setMessage("All fields are required!");
    }
    const reqData = {
      Id: formData.Id,
      Name: formData.Name,
      Class: formData.Class,
      Address: formData.Address,
      PhoneNumber: formData.PhoneNumber
    }
    const endpoint = isDisabled ? "http://localhost:8000/routes/update" : "http://localhost:8000/routes/create";
    const method = isDisabled ? "PUT" : "POST"

    fetch(endpoint, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reqData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("DATA", data)
        if (data.code === 200) {
          // setMessage(data.msg)
          if (isDisabled) {
            setUsers((prevUsers) =>
              prevUsers.map((user) => user.Id === formData.Id ? { ...user, ...reqData } : user))
            console.log("ddddddeee", data.msg)
            // handleClosePopup()
            setIsPopupOpen(false)
          }
          else {
            console.log("ddddd", data.msg)
            // setMessage(data.msg)
            setUsers((prevUsers) => [
              ...prevUsers,
              reqData, // Add the whole object
            ]);
            setIsPopupOpen(false)
          }
          AppToasster.show({
            message: data.msg,
            timeout: 3000,
            intent: 'success'
          })
          setMessage(data.msg)
        }
        else {
          setMessage(data.msg)
        }
      })
      .catch((err) => {
        console.log("ERRORRRR", err)
        AppToasster.show({
          message: "Something went wrong!!!",
          timeout: 3000,
          intent: 'danger'
        })
      })
  }
  console.log("users", users)
  return (
    <div className="App">
      <h1>CRUD OPERATIONS</h1>
      <button onClick={click}>Add User</button>
      {
        isPopupOpen && (
          <div className='popup'>
            <div className='popup-content'>
              <h2>{isDisabled ? "Update User" : "Create User"}</h2>
              <label>Id <input type='text' name="Id" onChange={handleInputChange} value={formData.Id} disabled={isDisabled} /></label>
              <label>Name <input type='text' name="Name" onChange={handleInputChange} value={formData.Name} /></label>
              <label>Class <input type='text' name="Class" onChange={handleInputChange} value={formData.Class} /></label>
              <label>Address <input type='text' name="Address" onChange={handleInputChange} value={formData.Address} /></label>
              <label>PhoneNumber <input type='text' name="PhoneNumber" onChange={handleInputChange} value={formData.PhoneNumber} /></label>
              <button onClick={handleSubmission}>{isDisabled ? "Update" : "Create"}</button><br></br>
              <button onClick={handleClosePopup}>Cancel</button><br></br>
              <p>{message}</p>
            </div>
          </div>
        )
      }
      <table className='bp4-html-table-modifier'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Class</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.Id}>
                <td>{user.Id}</td>
                <td>{user.Name}</td>
                <td>{user.Class}</td>
                <td>{user.Address}</td>
                <td>{user.PhoneNumber}</td>
                <td>
                  <Button intent='primary' className="custom-button" onClick={() => { handleUpdate(user.Id) }}>Update</Button>
                  {/* &nbsp; */}
                  <Button intent='danger' className="custom-button" onClick={() => { handleDelete(user.Id) }}>Delete</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No users found</td>
            </tr>
          )}

          {/* <tr>
            <td>1</td>
            <td>Ssssssssssssssariha</td>
            <td>2</td>
            <td>Tirunelveli</td>
            <td>9876543210</td>
            <td>Edit/Delete</td>
          </tr> */}
        </tbody>
      </table>
    </div >
  );
}

export default App;
