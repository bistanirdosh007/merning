// This middleware checks if the user is already active in the session
module.exports = (req, res, next) => {
  // Assuming you store user session information in req.session
  if (req.session && req.session.userIsActive) {
    // User is already active, prevent login
    return res.status(403).json({ error: "User is already logged in." });
  }
  // User is not active, proceed with the login
  next();
};
