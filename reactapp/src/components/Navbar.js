import React from 'react'
import {  Link } from "react-router-dom"
import './Navbar.css';

export default function Navbar() {
  return (
    <div style={{backgroundColor: "rgba(0, 0, 0, 0.5)",}} >
        <nav id='navbar' class="navbar navbar-expand-lg rounded-bottom-5" style={{marginBottom:"0",
      fontFamily: "Arial, sans-serif",
      fontSize:"1rem",
      borderRadius: "10px",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      
      
      

      }}>
   
   <div class="container-fluid">
     <Link class="navbar-brand" to="/api">
       <img src="logo.png" alt="Logo" width="220" height="70"  />
      
     </Link>
   </div>
 
     
   <div className="container-fluid " >
     <Link className="navbar-brand" href="/"></Link>
     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
       <span className="navbar-toggler-icon"></span>
     </button>
     <div className="collapse navbar-collapse" id="navbarSupportedContent text-white">
       <ul class="navbar-nav me-auto mb- mb-lg-0 " >
         <li className="nav-item">
           <Link className="nav-link active text-white fs-5 
            fw-bold mr-5" aria-current="page" to="/">Home</Link>
         </li>
         <li className="nav-item">
           <Link className="nav-link active text-white fs-5 
            fw-bold" aria-current="page" to="/about">About Us</Link>
         </li>
         <li className="nav-item">
           <Link className="nav-link active text-white fs-5 
            fw-bold" aria-current="page" to="/about">Book</Link>
         </li> 
         <li className="nav-item">
           <Link className="nav-link active text-white fs-5 
            fw-bold" aria-current="page" to="/trade">Library</Link>
         </li>
         
         <li className="nav-item">
           <Link className="nav-link active text-white fs-5 
            fw-bold" aria-current="page" to="/test">Conatct Us</Link>
         </li> 
         {/* <li className="nav-item">
           <Link className="nav-link active" aria-current="page" to="/cart">cart</Link>
         </li>  */}
         {/* <li className="nav-item">
           <a className="nav-link" href="/">Link</a>
         </li> */} 
         {/* <li className="nav-item dropdown">
           <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
             Dropdown
           </a>
           <ul className="dropdown-menu">
             <li><a className="dropdown-item" href="/">Action</a></li>
             <li><a className="dropdown-item" href="/">Another action</a></li>
             <li><hr className="dropdown-divider"/></li>
             <li><a className="dropdown-item" href="/">Something else here</a></li>
           </ul>
         </li>
         <li className="nav-item">
           <a className="nav-link disabled">Disabled</a>
         </li> */}
       </ul>
       <form className="d-flex" role="search">
         <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
         <button className="btn btn-outline-light" type="submit">Search</button>
       </form>
     </div>
   </div>
 </nav>
 <outlet/>

    </div>
  )
};

