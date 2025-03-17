import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Component/Home';
import About from './Component/About';
import Contact from './Component/Contact';
import User from './Component/User';
import OldBooks from './Component/OldBooks';
import NewBooks from './Component/NewBooks';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/user/1">User 1</Link></li>
          <li><Link to="/user/2">User 2</Link></li>
          <li><Link to="/books/old_Books">OldBooks</Link></li>
          <li><Link to="/books/new_Books">NewBooks</Link></li>

        </ul>
        <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/user/:id" element={<User/> }/>
        {/* the below portion is called as nested routes. this is used when the url is to change at sometimes and
        the some part of the url are same, we can use the nested route */}
        <Route path="/books">
          <Route path="old_Books" element={<OldBooks />} />
          <Route path="new_Books" element={<NewBooks />} />
        </Route>
        </Routes>
     </BrowserRouter>
    </div>
  );
}

// check in the inspect, u can see that the li comes as /books/old_books




export default App;
