import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ResponseList({ formId, onBack }) {
  const [form, setForm] = useState(null);

  useEffect(() => {
    async function fetchForm() {
      const formSnap = await getDoc(doc(db, "forms", formId));
      setForm(formSnap.data());
    }
    fetchForm();
  }, [formId]);

  if (!form) return <div>Loading...</div>;

  return (
    <div>
      <h2>Responses to: {form.title}</h2>
      {(!form.responses || form.responses.length === 0) && <div>No responses yet.</div>}
      {(form.responses && form.responses.length > 0) && (
        <table border={1} cellPadding={6}>
          <thead>
            <tr>
              {form.questions.map((q, i)=><th key={i}>{q.label}</th>)}
            </tr>
          </thead>
          <tbody>
            {form.responses.map((resp, idx) => (
              <tr key={idx}>
                {form.questions.map((q, i)=>(
                  <td key={i}>{resp[i]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={onBack} style={{marginTop:20}}>Back</button>
    </div>
  );
}