import { db, bucket } from "../../firebase-admin";
export default async function handler(req, res) {
  console.log(req.body.type);
  if (req.body.type === "user.created") {
    await db.collection("users").doc(req.body.data.id).set(req.body.data);
    await db
      .collection("usernames")
      .doc(req.body.data.username)
      .set({ id: req.body.data.id });
  }

  if (req.body.type === "user.updated") {
    const result = await db
      .collection("users")
      .doc(req.body.data.id)
      .set(req.body.data);
    db.collection("posts").doc(post);
  }

  if (req.body.type === "user.deleted") {
    bucket.deleteFiles({ prefix: `posts/${req.body.data.id}` }, (err) => {});
    const postsRef = await db.collection("users").doc(req.body.data.id).get();
    const posts = postsRef.data().posts;
    posts.map(async (post) => {
      await db.collection("posts").doc(post).delete();
    });
    await db.collection("users").doc(req.body.data.id).delete();
  }

  res.status(200).json({ message: "Success", data: "WEEEEEEEEEEEE" });
}
