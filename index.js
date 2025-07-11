const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

exports.createUserDocument = functions.auth.user().onCreate((user) => {
  const { uid, email, displayName } = user;
  const userDocRef = db.collection("users").doc(uid);
  return userDocRef.set({
    uid: uid,
    email: email,
    fullName: displayName || "New User",
    username: "user" + uid.substring(0, 6),
    profilePicUrl: "",
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    isBlocked: false,
    isAdmin: false,
  });
});
