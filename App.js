import React, { useState, useEffect } from "react";
import SignUp from "./SignUp";
import Auth from "./Auth";
import OwnerPanel from "./OwnerPanel";
import AdminPanel from "./AdminPanel";

export default function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("user");
  const [view, setView] = useState("signin");

  useEffect(() => {
    if (user) {
      const users = JSON.parse(localStorage.getItem("users") || "{}");
      setRole(users[user]?.role || "user");
    }
  }, [user]);

  if (!user) {
    return (
      <div>
        {view === "signin" && <Auth onAuth={setUser} />}
        {view === "signup" && <SignUp onSignUp={setUser} />}
        <div style={{marginTop: 15}}>
          {view === "signin" ? (
            <button onClick={() => setView("signup")}>Sign Up</button>
          ) : (
            <button onClick={() => setView("signin")}>Sign In</button>
          )}
        </div>
      </div>
    );
  }

  if (role === "owner") return <OwnerPanel user={user} />;
  if (["admin", "manager", "moderator"].includes(role)) return <AdminPanel user={user} />;

  // Regular user view
  return <div>Welcome, {user}! You are logged in as a user.</div>;
}