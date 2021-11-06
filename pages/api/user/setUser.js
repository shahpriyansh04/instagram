import { doc, getDoc } from "firebase/firestore";
import db from "../../../firebase-admin";
var UsernameGenerator = require("username-generator");
export default async function handler(req, res) {
  var newUsername = UsernameGenerator.generateUsername();
  const userRef = db.collection("users").doc(req.query.id);

  const snapshot = await userRef.set({ username: newUsername });
  console.log(snapshot);
  //   const username = snapshot._fieldsProto.username.stringValue;

  res.status(200).json({ message: "Success", username: newUsername });
}
