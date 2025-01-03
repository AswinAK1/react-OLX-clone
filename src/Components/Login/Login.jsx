import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/Context';
import './Login.css';


function Login() {


  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const {auth} = useContext(FirebaseContext)
  const navigate = useNavigate()

  const handleLogin = async(e) =>{
    e.preventDefault()

    if(!auth){
      console.error('Firebase Auth instance not found.');
      return;
    }

    try{

      const userCredential = await signInWithEmailAndPassword(auth,email,password)
      const userId = userCredential.user.uid
      navigate('/')

    }
    catch (error) {
      console.error("Error creating user:", error.message);
      alert(`Error: ${error.message}`);
    }

  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e) =>setEmail(e.target.value)}
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a href='/signup'>Signup</a>
      </div>
    </div>
  );
}

export default Login;
