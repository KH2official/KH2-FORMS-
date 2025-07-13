import React, { useEffect, useState } from "react";
import { getFormsByEmail } from "./firebaseForms";

export default function FormList({ user, onFill, onViewResponses }) {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    async function fetchForms() {
      setForms(await getFormsByEmail(user));
    }
    fetchForms();
  }, [user]);

  if (forms.length === 0) return <div>No forms created yet.</div>;
  return (
    <div>
      <h2>Your Forms</h2>
      <ul>
        {forms.map(f=>(
          <li key={f.id} style={{marginBottom:10}}>
            <b>{f.title}</b>
            <button onClick={()=>onFill(f.id)} style={{marginLeft:10}}>Fill</button>
            <button onClick={()=>onViewResponses(f.id)} style={{marginLeft:10}}>Responses ({f.responses ? f.responses.length : 0})</button>
          </li>
        ))}
      </ul>
    </div>
  );
}