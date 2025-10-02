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
import Vehiclebook from "./Component/Vehiclebook/Vehiclebook";
import Sedanrent from "./Component/Sedanrent/Sedanrent";
import Lorry from "./Component/Lorry/Lorry";
import Bike from "./Component/Bike/Bike";
  
 


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
               <Route path="/vehiclebook" element={<Vehiclebook/>}/>
               <Route path="/sedanrent" element={<Sedanrent/>}/>
               <Route path="/lorry" element={<Lorry/>}/>
               <Route path="/bike" element={<Bike/>}/>

          </Routes>
          {/* Other modules for your friends */}
          
          {/* 404 Fallback */}
        </React.Fragment>
     

    </div>
  

    
    
  );
}
export default App;