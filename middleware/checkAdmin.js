const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(403).json({ message: "you not suppplied token" });
    }
    const user = jwt.decode(req.headers.authorization.split(" ")[1]);

    if (user.role == "admin") {
      next();
    } else {
      return res.status(401).json({
        message: "you are not authorized",
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: "server error",
    });
  }
};
