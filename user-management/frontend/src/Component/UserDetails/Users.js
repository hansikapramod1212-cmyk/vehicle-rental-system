import React,{useState,useEffect} from 'react';
import Nav from '../Nav/Nav';
 import  "./Users.css";
import axios from "axios";
import User from '../User/User';
const URL ="http://localhost:5000/users";

const fetchHandler=async()=>{
    return await axios.get(URL).then((res)=>res.data);
}
function Users() {

    const [users,setUsers]=useState();
    useEffect(()=>{
        fetchHandler().then((data)=>setUsers(data.users))
    },[])
  return (
    <div>
      
      <h1>User Deatils display page</h1>
    <div className="users-container">
    {users && users.map((user,i)=>(
        <div key={i}>
            <User user={user}/>
        </div>
    ))}
    </div>
    </div>
)
}

export default Users
