import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleRegister(e){
    e.preventDefault();
    
    try{
        await axios.post("http://localhost:8080/register", {
            email, password, name
        })
        .then((res) => {
          if(res.data === "exist"){
            alert("Existing User")
            navigate("/login")
          } else if(res.data === "notexist") {
            alert("Successfully registered.")
            navigate("/login")
          }
        })
        .catch(e => {
          alert("Wrong Details")
          console.log(e)
        })
    }
    catch(e){
        console.log(e)
    }
};

  function goToLogin(){
    navigate("/login")
  }

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form">
        <h2>Register</h2>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="string"
            id="name"
            placeholder='Enter Name'
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder='Enter Mail Id'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder='Enter Password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className='register-button' type="submit">Register</button>
        <button className="nav_register" 
          onClick={goToLogin}>
            Already, Registered.
        </button>
      </form>
    </div>
  );
};

export default Register;