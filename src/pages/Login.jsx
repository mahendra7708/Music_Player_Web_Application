
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    const savedEmail = localStorage.getItem("tunewaveEmail");
    const savedPassword = localStorage.getItem("tunewavePassword");

    const enteredEmail = email.trim().toLowerCase();

    if (
      savedEmail &&
      savedPassword &&
      enteredEmail === savedEmail.trim().toLowerCase() &&
      password === savedPassword
    ) {
      // Update authentication state
      if (onLogin) {
        onLogin();
      }

      // Open Home after successful login
      navigate("/home", { replace: true });
    } else {
      alert("Invalid email or password. Please sign up first.");
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleLogin}>
        <h1>♫ TuneWave</h1>
        <h2>Welcome Back</h2>
        <p>Login to enjoy your favorite music.</p>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />

        <button type="submit">Login</button>

        <p>
          Don't have an account?{" "}
          <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
