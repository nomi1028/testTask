const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const verify = jwt.verify(token, process.env.EMAIL_ACTIVATE_TOKEN);
    next();
  } catch (error) {
    return res.status(401).json({
      messgage: "invaild token",
    });
  }
};
