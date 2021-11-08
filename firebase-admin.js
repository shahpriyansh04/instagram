var admin = require("firebase-admin");

const { getStorage } = require("firebase-admin/storage");

var serviceAccount = require("./instagram-8ee54-firebase-adminsdk-oe5j1-60b32723a8.json");
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "instagram-8ee54.appspot.com",
  });
}
const db = admin.firestore();

const bucket = getStorage().bucket();
export { db, bucket };
