// we are using backend code nodejs . refer db_try folder in nodejs


import { useEffect, useState } from 'react';
import './App.css';
import { Button, EditableText, InputGroup, Toaster } from '@blueprintjs/core';

const AppToaster = Toaster.create({
  position: "top-right"
})

function App() {
  const [users, setUsers] = useState([]) // used to store the set of array list of users
  const [newId, setNewId] = useState("")
  const [newName, setNewName] = useState("")
  const [newAge, setNewAge] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newAddress, setNewAddress] = useState("")

  useEffect(() => {
    fetch("http://localhost:8000/routes/all")
      .then((response) => response.json())
      // this helps to get the response from the fetch, we need to convert them into json format . because that doesn't
      // know to get them in the json format.
      .then((json) => setUsers(json))
    // this helps to set the values that is got from the above json format
  }, [])

  function addUser() {

    const id = newId.trim()
    const name = newName.trim()
    const age = newAge.trim()
    const email = newEmail.trim()
    const address = newAddress.trim()

    // this trim function just to trim the spaces that is existing while typing in the textbox

    if (id && name && age && email && address) {
      console.log("Data being sent to the backend:", {
        user_id: id,
        user_name: name,
        user_age: age,
        user_email: email,
        user_address: address
      });
      fetch("http://localhost:8000/routes/create_user",
        {
          method: "POST",
          body: JSON.stringify({
            user_id: id,
            user_name: name,
            user_age: age,
            user_email: email,
            user_address: address
          }),
          // the user_id,user_name,user_age,user_email,user_address are the keys that is coming from node code
          // id,name,age,email,address these are coming from react code
          headers: {
            "Content-type": "application/json"
            // The "Content-Type": "application/json" header is important because it tells the server that the data being 
            // sent in the request body is in JSON format. This allows the server to correctly parse the incoming data as JSON, 
            // ensuring that the server can process and use the data appropriately. Without it, the server may not understand the data format, leading to errors.
          }
        })
        .then((response) => response.json())
        .then((data) => {
          setUsers((prevUsers) => [...prevUsers, data]);
          // to store the added with the previous data
          AppToaster.show({
            message: "Successful",
            timeout: 3000,
            intent: 'success'
          })
          // apptoaster is a function from blueprint that is used to show some messages 
          setNewId("")
          setNewName("")
          setNewAge("")
          setNewEmail("")
          setNewAddress("")
        })
      // the empty setNewId,setNewName,setNewAge,setNewEmail,setNewAddress are used to show after entering all the values 
      // clicking add user button to get empty in those fields
    }
  }

  function onChangeHandler(id, key, value) {
    setUsers((users) => {
      return users.map((user) => {
        return user.user_id === id ? { ...user, [key]: value } : user
      })
    })
  }
  // to change a specific data in an array we can use map
  // the above code ,you can also directly use the users alone then map .
  // this onchange handler is used to save the value for the particular id if it is changed else that remains the same

  function updateUser(id) {
    const user_info = users.find((user) => user.user_id === id)
    const payload = {
      // id: user_info.user_id, // Make sure to use the correct user ID
      user_id: user_info.user_id,
      user_name: user_info.user_name,
      user_age: user_info.user_age,
      user_email: user_info.user_email,
      user_address: user_info.user_address,
    };
    // this payload part can be seen in the inspect under network tab in fetch/XHR
    fetch("http://localhost:8000/routes/update_user",
      {
        method: "POST",
        // the method should be PUT but in node code we have given as post so we used here too
        body: JSON.stringify(payload),
        headers: {
          "Content-type": "application/json"
        }
      })
      .then((response) => response.json())
      .then((data) => {
        setUsers((prevUsers) => {
          return prevUsers.map((user) =>
            user.user_id === id ? { ...user, ...data } : user
          );
        });

        //the above setUsers part of the code is used to update the state of the users and ensure that the updated values are reflected in the UI.

        AppToaster.show({
          message: "Successfully updated",
          timeout: 3000,
          intent: 'success'
        })
      })
  }

  function deleteUser(id) {
    const user = users.find((user) => user.user_id === id)
    fetch('http://localhost:8000/routes/delete_user', {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", // Ensure this is set
      },
      body: JSON.stringify({ user_id: user.user_id })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data)
        setUsers((prevUsers) => prevUsers.filter((user) => user.user_id !== id));
        // the above line filters from the list and check for the id if it not available it will be removed from the list
        AppToaster.show({
          message: "Successfully deleted",
          timeout: 3000,
          intent: 'success'
        })
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        AppToaster.show({
          message: "Error deleting user",
          timeout: 3000,
          intent: 'danger'
        });
      });
  }

  return (
    <div className="App">
      <table className='bp4-html-table-modifier'>
        <thead>
          <tr>
            {/* According to HTML table semantics, the <th> elements must be
          inside a <tr> element within the <thead> section, not directly inside the <thead> itself. */}
            <th> Id </th>
            <th> Name </th>
            <th> Age </th>
            <th> Email </th>
            <th> Address </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) =>
            <tr key={user.user_id}>
              <td>{user.user_id}</td>
              <td>{user.user_name}</td>
              <td><EditableText onChange={(value) => { onChangeHandler(user.user_id, 'user_age', value) }} value={user.user_age} /></td>
              <td><EditableText onChange={(value) => { onChangeHandler(user.user_id, 'user_email', value) }} value={user.user_email} /></td>
              <td><EditableText onChange={(value) => { onChangeHandler(user.user_id, 'user_address', value) }} value={user.user_address} /></td>
              {/* the editabletext in blueprint helps to edit the field if you see in screen you can it looks as edit form  */}
              {/* onChangerHandler is a function that is created by us. the parameters in that are 3
              1. to which id the change should reflect
              2. the key value (to which field the change should reflect)
              3. the value that is changed now */}
              <td>
                <Button intent='primary' onClick={() => { updateUser(user.user_id) }}>Update</Button>
                {/* this onclick event is used to update the details that is changed */}
                &nbsp;
                {/* the nbsp is used to give a space between the update and the delete buttons*/}
                <Button intent='danger' onClick={() => { deleteUser(user.user_id) }}>Delete</Button>
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td><InputGroup value={newId} onChange={(e) => setNewId(e.target.value)} placeholder='Enter Id' /></td>
            <td><InputGroup value={newName} onChange={(e) => setNewName(e.target.value)} placeholder='Enter Name' /></td>
            <td><InputGroup value={newAge} onChange={(e) => setNewAge(e.target.value)} placeholder='Enter Age' /></td>
            <td><InputGroup value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder='Enter Email' /></td>
            <td><InputGroup value={newAddress} onChange={(e) => setNewAddress(e.target.value)} placeholder='Enter Address' /></td>
            <td><Button intent='success' onClick={addUser}>Add User</Button></td>
            {/* this intent gives the color of the button  */}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default App;
