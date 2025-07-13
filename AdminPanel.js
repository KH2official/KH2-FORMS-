import React, { useState, useEffect } from "react";

export default function AdminPanel({ user }) {
  const [users, setUsers] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem("users") || "{}"));
  }, []);

  function setStatus(email, status, value) {
    const updated = { ...users };
    updated[email][status] = value;
    localStorage.setItem("users", JSON.stringify(updated));
    setUsers(updated);
    setMessage(`${email} marked as ${status}: ${value}`);
  }

  return (
    <div>
      <h2>Admin Panel</h2>
      {message && <div style={{color:"green"}}>{message}</div>}
      <table border={1} cellPadding={5}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Banned</th>
            <th>Warned</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(users).map(u => (
            <tr key={u.email}>
              <td>{u.email}</td>
              <td>{u.role || "user"}</td>
              <td>{u.banned ? "Yes" : "No"}</td>
              <td>{u.warned ? "Yes" : "No"}</td>
              <td>
                <button onClick={() => setStatus(u.email, "banned", !u.banned)}>
                  {u.banned ? "Unban" : "Ban"}
                </button>
                <button onClick={() => setStatus(u.email, "warned", !u.warned)} style={{marginLeft: 5}}>
                  {u.warned ? "Unwarn" : "Warn"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}