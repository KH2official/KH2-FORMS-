import React, { useState } from "react";

export default function SignUp({ onSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!email || !password || !confirm) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    if (users[email]) {
      setError("Account already exists.");
      return;
    }
    users[email] = {
      email,
      password,
      role: email === "kysongesset@gmail.com" ? "owner" : "user",
      banned: false,
      warned: false,
    };
    localStorage.setItem("users", JSON.stringify(users));
    if (onSignUp) onSignUp(email);
  }

  return (
    <form onSubmit={handleSubmit} style={{
      maxWidth: 320, margin: "40px auto", padding: 20,
      border: "1px solid #ccc", borderRadius: 10,
    }}>
      <h2>Sign Up</h2>
      <label>
        What is your email?*<br />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)}
          required style={{ width: "100%", marginBottom: 10 }} />
      </label>
      <label>
        Password?*<br />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)}
          required style={{ width: "100%", marginBottom: 10 }} />
      </label>
      <label>
        Confirm Password?*<br />
        <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)}
          required style={{ width: "100%", marginBottom: 10 }} />
      </label>
      <button type="submit">Sign Up</button>
      {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
    </form>
  );
}