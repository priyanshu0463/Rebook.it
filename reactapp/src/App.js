import Navbar from './components/Navbar';
// import Test from './components/Test';
import Api from './components/Api';
import Trade from './components/Trade';
import About from './components/About';
import Shared from './components/Shared';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
// import Cart from './components/Cart';
import { Route, Routes,BrowserRouter as Router } from "react-router-dom";
import React from 'react';
import {Container} from "react-bootstrap"
import {AuthProvider} from "./contexts/AuthContext"


function App() {
  return (
    
    <div>
        <Router>
          <AuthProvider>
            <Routes>
              {/* <Route path="/signup" element={<Signup />}/>
              <Route path="/" element={<Login />}/> */}
              <Route exact path="/" element={ <Api/> }/>
              <Route exact path="/trade" element={<Trade/> } />
              <Route exact path="/shared" element={<Shared />} />
              <Route exact path="/about" element={<About/>} />
          </Routes>
          </AuthProvider>
              {/* <Navbar/>
              <Routes>
              <Route exact path="/" element={ <Api/> }/>
              <Route exact path="/trade" element={<Trade/> } />
              <Route exact path="/shared" element={<Shared />} />
              <Route exact path="/about" element={<About/>} />
            </Routes>
            <Signup /> */}

        </Router>

    </div>
   
  //   <React.Fragment>
  //   <BrowserRouter>
  //   <Navbar/>
  //   <Routes>
  //   <Route exact path="/" element={ <Api/> }/>
  //   <Route exact path="/trade" element={<Trade/> } />
  //   <Route exact path="/shared" element={<Shared />} />
  //   <Route exact path="/about" element={<About/>} />
  //   {/* <Route exact path="/test" element={<test/>} />  */}
  
  
  // </Routes>
  // </BrowserRouter>
  // </React.Fragment>
  
  );
}

export default App;
