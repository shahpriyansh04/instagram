import { doc, getDoc } from "firebase/firestore";
import db from "../../../firebase-admin";
export default async function handler(req, res) {
  const userRef = db.collection("users").doc(req.query.id);
  console.log(req.query.id);
  const snapshot = await userRef.get();
  const username = snapshot._fieldsProto.username.stringValue;

  res.json({ username });
}
