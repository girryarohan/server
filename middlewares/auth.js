const admin = require("../firebase");
const User = require("../models/user");

exports.authCheck = async (req, res, next) => {
  console.log(req.headers); //token
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    // console.log("MIDDLEWARE AUTH: Firebase user in authcheck", firebaseUser);
    // here we got the user information at backend now we will to store it in our local mongo db
    req.user = firebaseUser;
    next();
  } catch (err) {
    console.log("Middleware Auth Error: ", err);
    res.status(401).json({
      err: "Invalid or Expired Token",
    });
  }
};

exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email: email }).exec();

  if (adminUser.role !== "admin") {
    res.status(403).json({
      err: "Admin resource. Access Denied",
    });
  } else {
    next();
  }
};
