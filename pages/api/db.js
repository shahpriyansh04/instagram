import db from "../../firebase-admin";
export default async function handler(req, res) {
  console.log(req.body.type);
  if (req.body.type === "user.created") {
    const result = await db
      .collection("users")
      .doc(req.body.data.id)
      .set(req.body.data);
  }
  if (req.body.type === "user.updated") {
    const result = await db
      .collection("users")
      .doc(req.body.data.id)
      .set(req.body.data);
  }
  if (req.body.type === "user.deleted") {
    const result = await db.collection("users").doc(req.body.data.id).delete();
  }
  res.status(200).json({ message: "Success", data: "WEEEEEEEEEEEE" });
}
