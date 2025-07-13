import { db } from "./firebase";
import { collection, addDoc, getDocs, doc, updateDoc, getDoc, arrayUnion, query, where } from "firebase/firestore";

// Add form
export async function createForm(form) {
  const ref = await addDoc(collection(db, "forms"), form);
  return ref.id;
}

// Get all forms by user email
export async function getFormsByEmail(email) {
  const q = query(collection(db, "forms"), where("owner", "==", email));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Add response to a form
export async function addResponse(formId, response) {
  const formRef = doc(db, "forms", formId);
  const formSnap = await getDoc(formRef);
  let responses = [];
  if (formSnap.exists() && formSnap.data().responses) {
    responses = formSnap.data().responses;
  }
  await updateDoc(formRef, {
    responses: [...responses, response]
  });
}

// Get all forms (admin only)
export async function getAllForms() {
  const snapshot = await getDocs(collection(db, "forms"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}