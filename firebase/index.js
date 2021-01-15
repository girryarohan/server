var admin = require("firebase-admin");

var serviceAccount = require("../config/fbServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
// 36
// To get logged in user data from at the backend we are going to use firebase admin tool
// in our frontend, user has already registered/logged in ...and then that user is also saced in firebase..
// that means, if you can get the user token from frontend to backend,
// we can easily use that token to do 2 things-
// 1. verify that it is a valid token
// 2. access user info from firebase using that token
// we will use firebase-admin tool to get this done -(Saving user info in local db)
// go to firebase console and get the firebase account service key
// path is -> Project settings > service accounts > generate new private key
// 36Firebase Admin
