var admin = require("firebase-admin");

var serviceAccount = require("./instagram-8ee54-firebase-adminsdk-oe5j1-60b32723a8.json");
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin.firestore();
