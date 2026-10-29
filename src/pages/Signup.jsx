
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignup(e) {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    if (password.length < 6) {
      alert("Password must contain at least 6 characters.");
      return;
    }

    // Save credentials using the same keys as Login.jsx
    localStorage.setItem("tunewaveName", name.trim());
    localStorage.setItem("tunewaveEmail", cleanEmail);
    localStorage.setItem("tunewavePassword", password);

    alert("Signup successful! Please log in.");
    navigate("/login", { replace: true });
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSignup}>
        <h1>♫ TuneWave</h1>
        <h2>Create Account</h2>
        <p>Create an account to enjoy your music.</p>

        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password (minimum 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />

        <button type="submit">Sign Up</button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
