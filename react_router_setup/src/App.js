
import './App.css';
import Contact from './Components/Contact';
import Home from './Components/Home';
import About from './Components/About';
import { BrowserRouter,Route,Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          {/* in the path the url localhost:3000 that is to be given. but while giving the localhost it can be accessed
          only from the local, to access from the other env we cannot use that so in the path property we use the slash(/).
          that acts as the default one and element property is added to move to that page */}
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          {/* the about and contact after slash are are used as uri(uniform resource identifier) in the url */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// the <BrowserRouter> acts as the parent div class and the <route> act as child
// npm i react-router-dom to installed to use the component browserRouter,routes,route