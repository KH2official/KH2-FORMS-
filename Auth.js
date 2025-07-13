import React, { useState } from "react";

export default function Auth({ onAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    if (users[email] && users[email].password === password) {
      if (onAuth) onAuth(email);
    } else {
      setError("Invalid email or password");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{
      maxWidth: 320, margin: "40px auto", padding: 20,
      border: "1px solid #ccc", borderRadius: 10,
    }}>
      <h2>Sign In</h2>
      <label>
        Email<br />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)}
          required style={{ width: "100%", marginBottom: 10 }} />
      </label>
      <label>
        Password<br />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)}
          required style={{ width: "100%", marginBottom: 10 }} />
      </label>
      <button type="submit">Sign In</button>
      {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
    </form>
  );
}