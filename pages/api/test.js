import { db, bucket } from "../../firebase-admin";
export default async function handler(req, res) {
  const ref = await db.collection("usernames").doc("shahpriyansh04").get();
  console.log(ref.data().id);
  res.status(200).json({ message: "Success", data: ref.data() });
}
