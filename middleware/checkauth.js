const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(403).json({ message: "you not suppplied token" });
    }
    const token = req.headers.authorization.split(" ")[1];

    const verify = jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (error) {
    return res.status(401).json({
      message: "invaild token",
    });
  }
};
