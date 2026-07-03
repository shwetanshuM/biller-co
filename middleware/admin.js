const jwt = require("jsonwebtoken");

function adminMiddleware(req, res, next) {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
      req.userId = decoded.id;
      next();
    } else {
      res.status(403).json({ message: "you are not signed in" });
    }
  } catch(e) {
    res.status(403).json({ message: "you are not signed in" });
  }
}

module.exports = { adminMiddleware };