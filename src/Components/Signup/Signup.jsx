import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Logo from "../../olx-logo.png";
import { FirebaseContext } from "../../store/Context";
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate()
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");

  const { auth, db } = useContext(FirebaseContext);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!auth) {
      console.error("Firebase Auth instance not found.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      await setDoc(doc(db,"users",userId),{
        userName:userName,
        email:email,
        number:number,
        createdAt:new Date(),
      })
      console.log("User created:", userCredential.user);
      alert("Signup successful!");
      navigate('/login')
    } catch (error) {
      console.error("Error creating user:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleSignup}>
          <label htmlFor="username">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            id="username"
            name="name"
            required
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            required
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            id="phone"
            name="phone"
            required
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            required
          />
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <a href="/login">Login</a>
      </div>
    </div>
  );
}
