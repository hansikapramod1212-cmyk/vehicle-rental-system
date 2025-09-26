import React from 'react'
import Nav from '../Nav/Nav';
import {Link} from "react-router-dom";

function User(props) {
  const{_id,name,gmail,age,address}=props.user;
  return (
    <div>
        
        <h1>Add User Display</h1>
        <br></br>
        <h1>ID:{_id}</h1>
        <h1>Name:{name}</h1>
        <h1>Gamil:{gmail}</h1>
        <h1>Age:{age}</h1>
        <h1>Address:{address}</h1>
        <Link to ={`/userdetails/${_id}`}>Update</Link>
        <button>Delete:</button>

      
    </div>
  )
}

export default User
