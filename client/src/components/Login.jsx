import { useState } from "react";
import { setToken } from "../auth";
import { useNavigate,Link } from "react-router-dom";
import "./Login.css"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("https://chat-bot-960g.onrender.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setToken(data.token);
      navigate("/chat"); 
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <h2>Log in</h2>
        <p className="login-desc">Welcome back — please sign in to continue.</p>

        <input className="login-input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="login-input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="login-button" type="submit">Login</button>

        <p className="login-meta">
          Don’t have an account?
          <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
