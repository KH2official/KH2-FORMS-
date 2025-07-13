import React, { useState } from "react";
import { createForm } from "./firebaseForms";

export default function FormBuilder({ user, onCreate, onCancel }) {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [qLabel, setQLabel] = useState("");
  const [qType, setQType] = useState("text");
  const [qOptions, setQOptions] = useState("");
  const [loading, setLoading] = useState(false);

  function addQuestion() {
    if (!qLabel) return;
    const question = { label: qLabel, type: qType };
    if (qType === "multiple") {
      question.options = qOptions.split(",").map(o=>o.trim()).filter(Boolean);
    }
    setQuestions([...questions, question]);
    setQLabel("");
    setQType("text");
    setQOptions("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title || questions.length === 0) return;
    setLoading(true);
    await createForm({ title, questions, owner: user, responses: [] });
    setLoading(false);
    onCreate();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Form</h2>
      <label>
        Title:<br />
        <input value={title} onChange={e=>setTitle(e.target.value)} required />
      </label>
      <hr />
      <h3>Add Question</h3>
      <label>
        Question:<br />
        <input value={qLabel} onChange={e=>setQLabel(e.target.value)} />
      </label>
      <br />
      <label>
        Type:
        <select value={qType} onChange={e=>setQType(e.target.value)}>
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="multiple">Multiple Choice</option>
        </select>
      </label>
      <br />
      {qType === "multiple" && (
        <label>
          Options (comma separated):<br />
          <input value={qOptions} onChange={e=>setQOptions(e.target.value)} />
        </label>
      )}
      <br />
      <button type="button" onClick={addQuestion}>Add Question</button>
      <ul>
        {questions.map((q, i) => (
          <li key={i}>
            {q.label} ({q.type})
            {q.type === "multiple" && q.options ? ` [${q.options.join(", ")}]` : ""}
          </li>
        ))}
      </ul>
      <hr />
      <button type="submit" disabled={loading}>{loading ? "Creating..." : "Create Form"}</button>
      <button type="button" onClick={onCancel} style={{marginLeft:10}}>Cancel</button>
    </form>
  );
}