const nodemailer = require("nodemailer");
require("dotenv/config");
const JWT = require("jsonwebtoken");

const GenerateToken = (user) => {
  const token = JWT.sign(
    {
      _id: user._id,
      name: user.name,
      role: user.role,
      email: user.email,
      phone_number: user.phone_number,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" },
    { algorithm: "RS256" }
  );

  return token;
};

module.exports = GenerateToken;
