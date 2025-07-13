import React, { useState, useEffect } from "react";

const ROLES = ["owner", "admin", "manager", "moderator", "user"];
const OWNER_EMAIL = "kysongesset@gmail.com";

export default function OwnerPanel({ user }) {
  const [users, setUsers] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem("users") || "{}"));
  }, []);

  function changeRole(email, role) {
    const updated = { ...users };
    updated[email].role = role;
    localStorage.setItem("users", JSON.stringify(updated));
    setUsers(updated);
    setMessage(`Role for ${email} set to ${role}.`);
  }

  if (user !== OWNER_EMAIL) return <div>Not authorized.</div>;

  return (
    <div>
      <h2>Owner Panel</h2>
      {message && <div style={{color:"green"}}>{message}</div>}
      <h3>Manage Roles</h3>
      <table border={1} cellPadding={5}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Current Role</th>
            <th>Set Role</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(users).map(u => (
            <tr key={u.email}>
              <td>{u.email}</td>
              <td>{u.role || "user"}</td>
              <td>
                {ROLES.map(r => (
                  <button
                    key={r}
                    disabled={u.role === r || (u.email === OWNER_EMAIL && r !== "owner")}
                    onClick={() => changeRole(u.email, r)}
                    style={{marginRight: 5}}>
                    {r}
                  </button>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}