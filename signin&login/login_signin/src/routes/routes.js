import { Route, Routes } from "react-router-dom"
import App from "../App"
import Signup from "../Component/Signup"
import ResetPassword from "../Component/ResetPassword"
import Login from "../Component/Login"

const additionalData_signup = { message: "Welcome to Signup Page" };

function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<App />} />
            <Route path='/signup' element={<Signup additionalData={additionalData_signup} />} />
            {/* <Route path='/' element={<App additionalData_loginup={additionalData_loginup}/>}/> */}
            <Route path='/resetPassword' element={<ResetPassword />} />
            <Route path='/login' element={<Login />} />
        </Routes>
    )
}

export default AppRoutes;