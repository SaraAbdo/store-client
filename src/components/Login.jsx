import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const BASE_URL = import.meta.env.VITE_SERVER_URL;


  const login = async () => {
    // CRA React app >>> const res = await fetch(`http://localhost:5000/api/auth/login`, {
    // Vite React app
    const res = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) onLogin(data.user);
    else alert(data.message);
  };

  const signup = async () => {
    const res = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });
    // const newUser = { email, password, role };
    // const res = await axios.post(`http://localhost:5000/api/auth/signup`,newUser) 
    const data = await res.json();
    if (res.ok) onLogin(data.user);
    else alert(data.message);
  };

  return (
    <div>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={login}>Login</button>
      <button onClick={signup}>Sign Up</button>
    </div>
  );
};

export default Login;
