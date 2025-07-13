import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { addResponse } from "./firebaseForms";

export default function FormFiller({ formId, onSubmit, onCancel }) {
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchForm() {
      const formSnap = await getDoc(doc(db, "forms", formId));
      setForm(formSnap.data());
    }
    fetchForm();
  }, [formId]);

  function handleChange(idx, value) {
    setAnswers({...answers, [idx]: value});
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await addResponse(formId, answers);
    setLoading(false);
    onSubmit();
  }

  if (!form) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>{form.title}</h2>
      {form.questions.map((q, idx) => (
        <div key={idx} style={{marginBottom:10}}>
          <label>{q.label}</label><br />
          {q.type === "text" && (
            <input value={answers[idx] || ""} onChange={e=>handleChange(idx, e.target.value)} />
          )}
          {q.type === "number" && (
            <input type="number" value={answers[idx] || ""} onChange={e=>handleChange(idx, e.target.value)} />
          )}
          {q.type === "multiple" && (
            <select value={answers[idx] || ""} onChange={e=>handleChange(idx, e.target.value)}>
              <option value="">Select...</option>
              {q.options.map((opt,i)=>
                <option key={i} value={opt}>{opt}</option>
              )}
            </select>
          )}
        </div>
      ))}
      <button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>
      <button type="button" onClick={onCancel} style={{marginLeft:10}}>Cancel</button>
    </form>
  );
}