 // src/App.js
 
 import React from "react";
 import {Route,Routes}from "react-router";
 import "./App.css"
  import Splash from "./Component/Splash/Splash";
 import Home from "./Component/Home/Home";
 import AddUser from "./Component/AddUser/AddUser";
 import Users  from "./Component/UserDetails/Users";
 import Nav from "./Component/Nav/Nav";
import UpdateUser from "./Component/UpdateUser/UpdateUser";
import Register from "./Component/Register/Register";
import Login from "./Component/Login/Login";

import Bookingmanagement from "./Component/Bookingmangement/Bookingmanagement";

 function App() {
  return (

     
    <div>
       
      <Nav/>

        <React.Fragment>
          
          <Routes>
            <Route path="/" element={<Splash />} />
          
              
            <Route path="/mainhome" element={<Home/>}/>
             <Route path="/adduser" element={<AddUser/>}/>
              <Route path="/userdetails" element={<Users/>}/>
               <Route path="/regi" element={<Register/>}/>
               <Route path="/log" element={<Login/>}/>
               <Route path="/userdetails/:id" element={<UpdateUser/>}/>

               <Route path="/bookingmanagement" element={<Bookingmanagement/>}/>
               

          </Routes>
          {/* Other modules for your friends */}
          
          {/* 404 Fallback */}
        </React.Fragment>
     

    </div>
  

    
    
  );
}
export default App;