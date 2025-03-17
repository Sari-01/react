import { useNavigate } from 'react-router-dom';
import './Login.css'
function Login() {
    const navigate = useNavigate()
    function home() {
        navigate('/')
    }
    return (
        <div className='back'>
            <h1>You have completed the given task successfully!</h1>
            <button className="backHome" onClick={home}>OK</button>
        </div>
    );
}

export default Login;
