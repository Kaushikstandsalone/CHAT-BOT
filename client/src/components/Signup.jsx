import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import "./Signup.css"

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      navigate("/login"); // go to login
    } else {
      alert("Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-box" onSubmit={handleSignup}>
        <h2>Sign up</h2>
        <p className="signup-desc">Create your account to get started.</p>

        <input className="signup-input" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input className="signup-input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="signup-input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />

        <button className="signup-button" type="submit">Create account</button>

        <p className="signup-meta">
          Already have an account?
          <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
