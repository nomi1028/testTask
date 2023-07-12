const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(403).json({ message: "you not suppplied token" });
    }
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.decode(token);

    if (user.role == "manager" && user._id == req.body.manager_id) {
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
