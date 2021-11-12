var admin = require("firebase-admin");

const { getStorage } = require("firebase-admin/storage");

var serviceAccount = require("./instagram-8ee54-firebase-adminsdk-oe5j1-60b32723a8.json");
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      type: "service_account",
      project_id: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PROJECT_ID,
      private_key_id: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY_ID,
      private_key: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY.replace(
        /\\n/g,
        "\n"
      ),
      client_email: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_EMAIL,
      client_id: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_ID,
      auth_uri: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_AUTH_URI,
      token_uri: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_TOKEN_URI,
      auth_provider_x509_cert_url:
        process.env.NEXT_PUBLIC_FIREBASE_ADMIN_AUTH_PROVIDER,
      client_x509_cert_url: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_URL,
    }),
    storageBucket: "instagram-8ee54.appspot.com",
  });
}
const db = admin.firestore();

const bucket = getStorage().bucket();
export { db, bucket };
