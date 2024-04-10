import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

import { MdOutlineKeyboardDoubleArrowDown } from 'react-icons/md'
import { MdOutlineKeyboardDoubleArrowUp } from 'react-icons/md'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 
  
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleSubmit = async (event) => { // Mark the function as async
        event.preventDefault();
        // Here you can implement your login logic, e.g., send the email and password to a server for authentication
        console.log('Email:', email);
        console.log('Password:', password);
        
        try {
          // Make an asynchronous request to the server using Axios
          const res = await axios.post("http://localhost:5001/login", { email, password });
          console.log(res.data); // Assuming the server responds with relevant data
          navigate('/teams');
        } catch (error) {
          console.error('Error:', error);
        }
    
        // Clear form fields after submission
        setEmail('');
        setPassword('');
      };
     

    return (
        <div name="Login" className="w-full flex flex-col items-center gap-9 py-32">
      <p className="text-2xl font-bold py-2">Login Page</p>
      <div className="w-full flex flex-col gap-3 md:w-[20%] lg:w-[20%]">
        <form onSubmit={handleSubmit} style={{ backgroundColor: 'black', padding: '20px', borderRadius: '10px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' , justifyContent: 'center' }}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
              style={{ marginLeft: '40px' ,borderRadius: '5px',backgroundColor: 'transparent', border: '1px solid white', padding: '8px' }}
            />
          </div>
          <br></br>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' ,justifyContent: 'center' }}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
              style={{marginLeft: '10px',borderRadius: '5px', backgroundColor: 'transparent', border: '1px solid white', padding: '8px' }}
            />
          </div>
          <br></br>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button type="submit" style={{ backgroundColor: 'blue', color: 'white', padding: '8px 16px', borderRadius: '5px', border: 'none' }}>Submit</button>
          </div>
        </form>
      </div>
    </div>
    )
}

export default Login
