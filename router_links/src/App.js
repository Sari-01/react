
import { BrowserRouter, Routes,Route, Link} from 'react-router-dom';
import './App.css';
import Home from './Component/Home';
import About from './Component/About';
import Contact from './Component/Contact';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/contact'>Contact</Link></li>
      </ul>
        <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// the Link to act as anchor tag here. this helps to link to the page that is needed
// while viewing in the console it will show as a href